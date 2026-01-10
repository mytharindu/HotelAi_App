import { Hotel } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingCard } from "./BookingCard"
import { useNavigate } from "react-router-dom"

export function BookingsTab({ bookings, filter, onFilterChange }) {
  const navigate = useNavigate()

  return (
    <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Your Bookings</CardTitle>
            <CardDescription className="font-medium text-gray-600">Manage and view your hotel reservations</CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("all")}
              className={filter === "all" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all" : "border-2 font-semibold hover:bg-amber-50 hover:border-amber-300 transition-all"}
            >
              All
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("upcoming")}
              className={filter === "upcoming" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all" : "border-2 font-semibold hover:bg-amber-50 hover:border-amber-300 transition-all"}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("completed")}
              className={filter === "completed" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all" : "border-2 font-semibold hover:bg-amber-50 hover:border-amber-300 transition-all"}
            >
              Completed
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("pending")}
              className={filter === "pending" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all" : "border-2 font-semibold hover:bg-amber-50 hover:border-amber-300 transition-all"}
            >
              Pending
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
              <Hotel className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">No bookings found</h3>
            <p className="mt-2 text-center text-sm text-gray-600 max-w-sm font-medium">
              {filter === "all"
                ? "You haven't made any bookings yet. Start exploring amazing hotels!"
                : `No ${filter} bookings found. Try a different filter.`}
            </p>
            <Button 
              className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => navigate("/")}
            >
              Browse Hotels
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}