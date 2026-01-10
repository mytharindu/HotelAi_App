import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import { useState } from "react";
import { CalendarCheck, Sparkles } from "lucide-react";

export function BookingDialog({ hotelName, hotelId, onSubmit, isLoading }) {
  const [open, setOpen] = useState(false);

  const handleBookingSubmit = async (bookingData) => {
    await onSubmit(bookingData);
    if (!isLoading) {
      setTimeout(() => setOpen(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="h-12 px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
        >
          <CalendarCheck className="w-5 h-5 mr-2" />
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-2 border-gray-200 rounded-2xl shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-100 p-6 pb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Book Your Stay
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 font-medium text-base">
            Complete the form below to book your stay at <span className="font-bold text-amber-600">{hotelName}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 bg-gradient-to-b from-white to-gray-50">
          <BookingForm
            onSubmit={handleBookingSubmit}
            isLoading={isLoading}
            hotelId={hotelId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}