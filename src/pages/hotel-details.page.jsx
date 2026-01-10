import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddReviewMutation, useCreateBookingMutation, useGetHotelByIdQuery, useGetReviewsForHotelQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { Building2, Coffee, MapPin, PlusCircle, Star, Tv, Wifi, Heart, Loader2 } from "lucide-react";
import { useParams } from "react-router";
import { BookingDialog } from "@/components/BookingDialog";
import { useNavigate } from "react-router";

const HotelDetailsPage = () => {
  const { _id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();

  const { user } = useUser();

  const { 
    data: reviews = [], 
    isLoading: reviewsLoading,
    refetch: refetchReviews
  } = useGetReviewsForHotelQuery(_id, {
    skip: !_id,
  });

  const handleAddReview = async () => {
    try {
      await addReview({
        hotelId: _id,
        comment: "This is a test review",
        rating: 5,
      }).unwrap();
    } catch (error) {}
  };

  const handleBook = async (bookingData) => {
    try {
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const result = await createBooking({
        hotelId: _id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: hotel.price * nights,
      }).unwrap();
      navigate(`/booking/payment?bookingId=${result._id}`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative w-full h-[400px]">
                <Skeleton className="w-full h-full rounded-2xl" />
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-red-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center bg-gradient-to-b from-white to-red-50">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-300">
              <Star className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Error Loading Hotel Details
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              {error?.data?.message || "Something went wrong. Please try again later."}
            </p>
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Image & Badges */}
          <div className="space-y-4">
            <div className="relative w-full h-[400px] group overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-200">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating Star Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-yellow-300">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                  <span className="font-bold text-gray-900">{hotel?.rating ?? "New"}</span>
                  <span className="text-gray-500 text-sm">
                    ({hotel?.reviews.length === 0 ? "No" : hotel?.reviews.length})
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-2 border-purple-300 font-semibold px-4 py-1.5 hover:shadow-md transition-shadow">
                Rooftop View
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-300 font-semibold px-4 py-1.5 hover:shadow-md transition-shadow">
                French Cuisine
              </Badge>
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300 font-semibold px-4 py-1.5 hover:shadow-md transition-shadow">
                City Center
              </Badge>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Header Section */}
            <Card className="border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="font-medium">{hotel.location}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 transition-all group"
                  >
                    <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 group-hover:fill-red-500 transition-all" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-500" />
                  <span className="font-bold text-xl text-gray-900">{hotel?.rating ?? "No rating"}</span>
                  <span className="text-gray-600 font-medium">
                    ({hotel?.reviews.length === 0 ? "No" : hotel?.reviews.length} reviews)
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About this property</h2>
                <p className="text-gray-700 leading-relaxed font-medium">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Wifi className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Free Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Restaurant</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Tv className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Flat-screen TV</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Coffee className="h-5 w-5 text-orange-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Coffee maker</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price & Actions */}
            <Card className="border-2 border-amber-200 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ${hotel.price}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">per night</p>
                  </div>
                  
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      disabled={isAddReviewLoading}
                      onClick={handleAddReview}
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-amber-400 hover:bg-amber-50 font-bold transition-all disabled:opacity-50"
                    >
                      {isAddReviewLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Add Review
                        </>
                      )}
                    </Button>
                    <BookingDialog
                      hotelName={hotel.name}
                      hotelId={_id}
                      onSubmit={handleBook}
                      isLoading={isCreateBookingLoading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelDetailsPage;