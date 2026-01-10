import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { 
  useGetHotelByIdQuery, 
  useCreateBookingMutation,
  useCheckRoomAvailabilityQuery
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, MapPin, Star, AlertCircle, CheckCircle, Calendar, Users, Home, Bed } from "lucide-react";
import BookingCard from "@/components/ui/hotels/hotel-details/BookingCard";

const BookingPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(_id);
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  // Booking State
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);

  // Check room availability when dates change
  const { data: availabilityData, isFetching: isCheckingAvailability } = useCheckRoomAvailabilityQuery(
    {
      hotelId: _id,
      checkIn: checkInDate?.toISOString(),
      checkOut: checkOutDate?.toISOString(),
    },
    {
      skip: !checkInDate || !checkOutDate,
    }
  );

  // Calculate nights when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(0);
    }
  }, [checkInDate, checkOutDate]);

  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (guests < 1 || guests > hotel.maxGuests) {
      toast.error(`Please select between 1 and ${hotel.maxGuests} guests`);
      return;
    }

    // Check availability before booking
    if (availabilityData && !availabilityData.isAvailable) {
      toast.error(`All ${hotel.totalRooms} rooms are fully booked for these dates. Try different dates.`);
      return;
    }

    try {
      // Create booking (backend assigns room number)
      const booking = await createBooking({
        hotelId: _id,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests: guests,
      }).unwrap();

      // Navigate to payment page
      navigate(`/booking/payment?bookingId=${booking._id}`);
    } catch (error) {
      console.error("Failed to create booking:", error);
      
      // Handle specific errors
      if (error.data?.message?.includes("fully booked")) {
        toast.error(error.data.message);
      } else if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to create booking. Please try again.");
      }
    }
  };

  const calculateSubtotal = () => hotel.price * nights;
  const calculateTotal = () => calculateSubtotal();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (isError || !hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load hotel details</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-white/80 rounded-full -ml-3 transition-all hover:shadow-md group"
        >
          <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back</span>
        </Button>

        {/* Page Title */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Confirm and pay
          </h1>
          <p className="text-gray-600 font-medium">Complete your booking details below</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Hotel Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Summary Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex gap-6">
                <div className="relative group">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-32 h-32 rounded-xl object-cover flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-amber-300 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">{hotel.name}</h2>
                      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                      <span className="font-bold text-sm text-gray-900">
                        {hotel.rating > 0 ? hotel.rating.toFixed(2) : "New"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-gray-500 block text-xs">Category</span>
                        <span className="font-semibold capitalize text-gray-900">{hotel.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-gray-500 block text-xs">Room Type</span>
                        <span className="font-semibold capitalize text-gray-900">{hotel.roomType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-gray-500 block text-xs">Max Guests</span>
                        <span className="font-semibold text-gray-900">{hotel.maxGuests}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-gray-500 block text-xs">Total Rooms</span>
                        <span className="font-semibold text-gray-900">{hotel.totalRooms || 5}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Availability Alert */}
            {checkInDate && checkOutDate && (
              <div>
                {isCheckingAvailability ? (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <p className="text-blue-900 font-semibold">Checking room availability...</p>
                    </div>
                  </div>
                ) : availabilityData ? (
                  <div className={`border-2 rounded-2xl p-5 shadow-lg transition-all duration-300 ${
                    availabilityData.isAvailable 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:shadow-xl' 
                      : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300 hover:shadow-xl'
                  }`}>
                    <div className="flex items-start gap-3">
                      {availabilityData.isAvailable ? (
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <p className={`font-bold text-lg mb-1 ${
                          availabilityData.isAvailable ? 'text-green-900' : 'text-red-900'
                        }`}>
                          {availabilityData.isAvailable 
                            ? `🎉 ${availabilityData.availableRooms} room(s) available`
                            : '❌ Fully Booked'}
                        </p>
                        <p className={`text-sm font-medium ${
                          availabilityData.isAvailable ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {availabilityData.isAvailable
                            ? `${availabilityData.bookedRooms} of ${availabilityData.totalRooms} rooms booked for these dates`
                            : `All ${availabilityData.totalRooms} rooms are booked for these dates. Please try different dates.`}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Trip Details Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-500" />
                Your trip
              </h2>
              
              <div className="space-y-5">
                <div className="flex justify-between items-start p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div>
                    <p className="font-bold mb-1.5 text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      Dates
                    </p>
                    <p className="text-gray-700 text-sm font-medium">
                      {checkInDate && checkOutDate 
                        ? `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`
                        : "Select dates in the booking card"}
                    </p>
                  </div>
                  {nights > 0 && (
                    <div className="bg-white px-3 py-1.5 rounded-full border border-amber-300 shadow-sm">
                      <p className="text-sm font-bold text-amber-600">
                        {nights} {nights === 1 ? "night" : "nights"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <div>
                    <p className="font-bold mb-1.5 text-gray-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      Guests
                    </p>
                    <p className="text-gray-700 text-sm font-medium">
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Description */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About this hotel</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {hotel.description}
              </p>

              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold mb-3 text-gray-900">✨ Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {hotel.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full group-hover:scale-125 transition-transform"></div>
                        <span className="text-sm text-gray-700 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">📋 Cancellation policy</h2>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed font-medium">
                  Free cancellation before check-in. After that, cancel up to 24 hours before check-in and get a 50% refund, minus the service fee.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard
              hotel={hotel}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guests={guests}
              nights={nights}
              onCheckInChange={setCheckInDate}
              onCheckOutChange={setCheckOutDate}
              onGuestsChange={setGuests}
              onReserve={handleConfirmBooking}
              calculateSubtotal={calculateSubtotal}
              calculateTotal={calculateTotal}
              isLoading={isCreatingBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;