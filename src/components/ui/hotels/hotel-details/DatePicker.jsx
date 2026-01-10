import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, addMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DatePicker = ({
  checkInDate,
  checkOutDate,
  nights,
  price,
  showDatePicker,
  onShowDatePickerChange,
  onCheckInChange,
  onCheckOutChange,
}) => {
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  const handleDateSelect = (date) => {
    if (selectingCheckIn) {
      onCheckInChange(date);
      onCheckOutChange(null);
      setSelectingCheckIn(false);
    } else {
      if (date > checkInDate) {
        onCheckOutChange(date);
        setSelectingCheckIn(true);
        onShowDatePickerChange(false);
      }
    }
  };

  const clearDates = () => {
    onCheckInChange(null);
    onCheckOutChange(null);
    setSelectingCheckIn(true);
  };

  const isDateInRange = (date) => {
    if (!checkInDate || !hoveredDate) return false;
    return date > checkInDate && date <= hoveredDate;
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    if (selectingCheckIn) return false;
    return checkInDate && date <= checkInDate;
  };

  const generateCalendar = () => {
    const today = new Date();
    const firstMonth = addMonths(new Date(today.getFullYear(), today.getMonth(), 1), currentMonthOffset);
    const secondMonth = addMonths(firstMonth, 1);
    return [firstMonth, secondMonth];
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const handlePreviousMonth = () => {
    if (currentMonthOffset > 0) setCurrentMonthOffset(currentMonthOffset - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthOffset(currentMonthOffset + 1);
  };

  const isPreviousDisabled = currentMonthOffset === 0;

  return (
    <Popover open={showDatePicker} onOpenChange={onShowDatePickerChange}>
      <PopoverTrigger asChild>
        <div className="grid grid-cols-2 divide-x divide-gray-300 cursor-pointer rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="p-4 hover:bg-gradient-to-br hover:from-amber-50 hover:to-transparent transition-all duration-300 group">
            <p className="text-xs font-bold mb-1.5 text-gray-500 group-hover:text-amber-600 transition-colors">CHECK-IN</p>
            <p className={`text-sm font-medium transition-colors ${checkInDate ? 'text-gray-900' : 'text-gray-400'}`}>
              {checkInDate ? format(checkInDate, "MM/dd/yyyy") : "Add date"}
            </p>
          </div>
          <div className="p-4 hover:bg-gradient-to-bl hover:from-orange-50 hover:to-transparent transition-all duration-300 group">
            <p className="text-xs font-bold mb-1.5 text-gray-500 group-hover:text-orange-600 transition-colors">CHECKOUT</p>
            <p className={`text-sm font-medium transition-colors ${checkOutDate ? 'text-gray-900' : 'text-gray-400'}`}>
              {checkOutDate ? format(checkOutDate, "MM/dd/yyyy") : "Add date"}
            </p>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[90vw] sm:w-auto max-w-[420px] sm:max-w-none p-0 rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 animate-in fade-in-0 zoom-in-95"
        align="start"
        sideOffset={10}
      >
        <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-gray-100">
            <div className="flex-1 min-w-[160px]">
              <p className="text-base font-bold text-gray-900 mb-1">
                {selectingCheckIn ? "Select check-in date" : "Select check-out date"}
              </p>
              <p className="text-xs text-gray-500">
                {checkInDate && !checkOutDate && "Minimum stay: 1 night"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousMonth}
                disabled={isPreviousDisabled}
                className="h-9 w-9 rounded-full disabled:opacity-20 hover:bg-amber-100 hover:text-amber-600 transition-all duration-200 border border-transparent hover:border-amber-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="h-9 w-9 rounded-full hover:bg-amber-100 hover:text-amber-600 transition-all duration-200 border border-transparent hover:border-amber-200"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {(checkInDate || checkOutDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearDates}
                  className="text-xs underline ml-2 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 font-semibold px-3"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 max-h-[65vh] overflow-y-auto sm:overflow-visible">
            {generateCalendar().map((monthDate, monthIdx) => {
              const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(monthDate);
              const monthName = format(monthDate, "MMMM yyyy");

              return (
                <div key={monthIdx} className="min-w-[260px]">
                  <h3 className="text-center font-bold mb-4 text-base text-gray-800 bg-gradient-to-r from-amber-50 to-orange-50 py-2 rounded-lg">
                    {monthName}
                  </h3>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-bold text-gray-500 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-sm">
                    {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="aspect-square" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
                      const day = dayIdx + 1;
                      const currentDate = new Date(year, month, day);
                      const isDisabled = isDateDisabled(currentDate);
                      const isCheckIn =
                        checkInDate &&
                        format(currentDate, "yyyy-MM-dd") === format(checkInDate, "yyyy-MM-dd");
                      const isCheckOut =
                        checkOutDate &&
                        format(currentDate, "yyyy-MM-dd") === format(checkOutDate, "yyyy-MM-dd");
                      const isInRange =
                        checkInDate && checkOutDate && currentDate > checkInDate && currentDate < checkOutDate;
                      const isInHoverRange = !selectingCheckIn && isDateInRange(currentDate);

                      return (
                        <button
                          key={day}
                          onClick={() => !isDisabled && handleDateSelect(currentDate)}
                          onMouseEnter={() => !selectingCheckIn && setHoveredDate(currentDate)}
                          onMouseLeave={() => setHoveredDate(null)}
                          disabled={isDisabled}
                          className={`
                            aspect-square rounded-xl flex items-center justify-center
                            transition-all duration-200 font-semibold text-sm
                            transform hover:scale-110 active:scale-95
                            ${
                              isDisabled
                                ? "text-gray-300 cursor-not-allowed line-through bg-gray-50"
                                : "hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100 cursor-pointer text-gray-700 hover:text-gray-900 hover:shadow-md"
                            }
                            ${isCheckIn || isCheckOut ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold shadow-lg scale-110 ring-2 ring-amber-200 ring-offset-2" : ""}
                            ${isInRange || isInHoverRange ? "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-900 font-semibold" : ""}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {checkInDate && checkOutDate && (
            <div className="mt-6 pt-4 border-t-2 border-gray-100">
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-xl p-4 text-center border-2 border-amber-200 shadow-inner">
                <p className="text-xs text-gray-600 font-semibold mb-1">Total Stay</p>
                <p className="font-bold text-xl text-gray-900">
                  {nights} {nights === 1 ? "night" : "nights"} • <span className="text-amber-600">${price * nights}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
