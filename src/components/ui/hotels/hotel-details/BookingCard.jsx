import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";
import DatePicker from "./DatePicker";
import GuestPicker from "./GuestPicker";

const BookingCard = ({
    hotel,
    checkInDate,
    checkOutDate,
    guests,
    nights,
    onCheckInChange,
    onCheckOutChange,
    onGuestsChange,
    onReserve,
    calculateSubtotal,
    calculateTotal,
    isLoading = false,
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGuestPicker, setShowGuestPicker] = useState(false);

    return (
        <div className="sticky top-24">
            <Card className="border-2 border-gray-200 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50">
                <CardContent className="p-6">
                    <div className="mb-6 pb-6 border-b-2 border-gray-100">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">${hotel.price}</span>
                            <span className="text-gray-500 font-medium">/ night</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-500" />
                            <span className="font-bold text-gray-900">
                                {hotel.rating > 0 ? hotel.rating.toFixed(2) : "New"}
                            </span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-600 underline cursor-pointer hover:text-gray-900">
                                {hotel.reviews?.length || 0} reviews
                            </span>
                        </div>
                    </div>

                    <div className="border-2 border-gray-300 rounded-xl mb-6 overflow-hidden hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        <DatePicker
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            nights={nights}
                            price={hotel.price}
                            showDatePicker={showDatePicker}
                            onShowDatePickerChange={setShowDatePicker}
                            onCheckInChange={onCheckInChange}
                            onCheckOutChange={onCheckOutChange}
                        />

                         <GuestPicker
                            guests={guests}
                            maxGuests={hotel.maxGuests}
                            showGuestPicker={showGuestPicker}
                            onShowGuestPickerChange={setShowGuestPicker}
                            onGuestsChange={onGuestsChange}
                        /> 
                    </div>

                    <Button
                        onClick={onReserve}
                        disabled={!checkInDate || !checkOutDate || isLoading}
                        className="w-full h-14 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:via-amber-700 hover:to-orange-600 text-white font-bold rounded-xl mb-4 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 text-base"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Processing...
                            </>
                        ) : (
                            "Continue to Payment"
                        )}
                    </Button>

                    <p className="text-center text-sm text-gray-500 mb-6 font-medium">
                        You won't be charged yet
                    </p>

                    {nights > 0 && (
                        <>
                            <div className="space-y-3 pb-4 mb-4 border-b-2 border-gray-100">
                                <div className="flex justify-between text-sm items-center">
                                    <span className="underline text-gray-700 hover:text-gray-900 cursor-pointer font-medium">
                                        ${hotel.price} × {nights} {nights === 1 ? "night" : "nights"}
                                    </span>
                                    <span className="text-gray-900 font-bold">${calculateSubtotal()}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-inner border border-gray-200">
                                <span className="font-bold text-lg text-gray-800">Total</span>
                                <span className="font-bold text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">${calculateTotal()}</span>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};


export default BookingCard;