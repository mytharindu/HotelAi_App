import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetBookingByIdQuery } from "@/lib/api";
import CheckoutForm from "@/components/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ChevronLeft, 
  Calendar, 
  Users, 
  DoorOpen, 
  MapPin,
  Clock,
  Shield,
  CheckCircle2
} from "lucide-react";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("bookingId");

  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(bookingId, {
    skip: !bookingId,
  });

  // Loading Skeleton 
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Skeleton className="h-8 sm:h-10 w-20 sm:w-24 mb-4 sm:mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <Card>
              <CardContent className="p-0">
                <Skeleton className="h-48 sm:h-56 md:h-64 w-full rounded-t-lg" />
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <Skeleton className="h-6 sm:h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <Skeleton className="h-48 sm:h-64 w-full" />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="lg:sticky lg:top-8">
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <Skeleton className="h-5 sm:h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-6 sm:h-8 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full mx-3 border-2 border-orange-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-b from-white to-orange-50">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-orange-300">
              <DoorOpen className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">No Booking Found</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-medium">Please create a booking first to proceed with payment</p>
            <Button 
              onClick={() => navigate("/")} 
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full mx-3 border-2 border-red-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-b from-white to-red-50">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-red-300">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">Booking Not Found</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-medium">Unable to load booking details. Please try again.</p>
            <Button 
              onClick={() => navigate("/")} 
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (booking.paymentStatus === "PAID") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full mx-3 border-2 border-green-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-b from-white to-green-50">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-green-300">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">Already Paid ✓</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-medium">This booking has already been paid successfully</p>
            <Button 
              onClick={() => navigate("/")} 
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 lg:mb-8 hover:bg-white/80 -ml-2 group rounded-full shadow-sm hover:shadow-md transition-all"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-semibold">Back</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Hotel Details Card */}
            <Card className="overflow-hidden border-2 border-gray-200 shadow-2xl rounded-2xl">
              <CardContent className="p-0">
                {/* Hotel Image */}
                <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 bg-gradient-to-r from-amber-500 to-orange-600 overflow-hidden rounded-t-2xl">
                  {booking.hotelId?.image ? (
                    <>
                      <img 
                        src={booking.hotelId.image} 
                        alt={booking.hotelId.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <DoorOpen className="w-16 h-16 sm:w-20 sm:h-20 text-white/50" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 line-clamp-2 drop-shadow-lg">{booking.hotelId?.name}</h1>
                    {booking.hotelId?.location && (
                      <div className="flex items-center text-white/90">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate font-medium">{booking.hotelId.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Booking Details</h2>
                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center text-blue-600 mb-1 sm:mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold">Check-in</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">
                        {checkInDate.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">After 2:00 PM</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border-2 border-purple-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center text-purple-600 mb-1 sm:mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold">Check-out</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">
                        {checkOutDate.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Before 11:00 AM</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border-2 border-green-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center text-green-600 mb-1 sm:mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold">Guests</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">{booking.guest} Guest{booking.guest > 1 ? 's' : ''}</p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">{nights} Night{nights > 1 ? 's' : ''}</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 sm:p-4 border-2 border-orange-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center text-orange-600 mb-1 sm:mb-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                          <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold">Room</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">Room {booking.roomNumber}</p>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">{booking.hotelId.roomType || 'Standard Room'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form Card */}
            <Card className="border-2 border-gray-200 shadow-2xl overflow-hidden rounded-2xl">
              <CardContent className="p-3 sm:p-4 md:p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="flex items-center mb-4 sm:mb-6 pb-4 border-b-2 border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Secure Payment</h2>
                </div>
                <CheckoutForm bookingId={bookingId} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="border-2 border-gray-200 shadow-2xl lg:sticky lg:top-8 rounded-2xl overflow-hidden">
              <CardContent className="p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50">
                <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gray-900 pb-3 border-b-2 border-gray-100">Price Summary</h3>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
                    <span className="text-gray-600 font-semibold">Room rate per night</span>
                    <span className="font-bold text-gray-900">${(booking.hotelId.price)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
                    <span className="text-gray-600 font-semibold">Duration</span>
                    <span className="font-bold text-gray-900">{nights} Day{nights > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-4 sm:pt-6 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-200">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total (USD)</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">${booking.totalAmount}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 border-2 border-green-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-green-900 mb-1">Payment Protection</p>
                      <p className="text-xs sm:text-sm text-green-700 font-medium">Your payment is secured with 256-bit encryption</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;