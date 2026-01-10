import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const GuestPicker = ({
  guests,
  maxGuests,
  showGuestPicker,
  onShowGuestPickerChange,
  onGuestsChange,
}) => {
  return (
    <Popover open={showGuestPicker} onOpenChange={onShowGuestPickerChange}>
      <PopoverTrigger asChild>
        <div className="p-4 border-t border-gray-300 cursor-pointer hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group">
          <p className="text-xs font-bold mb-1.5 text-gray-500 group-hover:text-amber-600 transition-colors">GUESTS</p>
          <p className="text-sm font-medium text-gray-900">
            {guests} {guests === 1 ? "guest" : "guests"} <span className="text-gray-400 text-xs">(max {maxGuests})</span>
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl shadow-2xl border-2 border-gray-200 p-6 animate-in fade-in-0 zoom-in-95 bg-gradient-to-b from-white to-gray-50" align="start">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg text-gray-900">Guests</p>
              <p className="text-sm text-gray-500">Maximum {maxGuests} guests allowed</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-2 border-gray-300 disabled:opacity-20 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 active:scale-90 font-bold text-lg disabled:hover:border-gray-300 disabled:hover:bg-transparent"
                onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                disabled={guests <= 1}
              >
                −
              </Button>
              <span className="w-10 text-center font-bold text-xl text-gray-900">{guests}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-2 border-gray-300 disabled:opacity-20 hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 active:scale-90 font-bold text-lg disabled:hover:border-gray-300 disabled:hover:bg-transparent"
                onClick={() => onGuestsChange(Math.min(maxGuests, guests + 1))}
                disabled={guests >= maxGuests}
              >
                +
              </Button>
            </div>
          </div>
          <Button
            onClick={() => onShowGuestPickerChange(false)}
            className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 rounded-xl"
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestPicker;