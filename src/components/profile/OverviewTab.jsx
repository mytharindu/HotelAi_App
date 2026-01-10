import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OverviewTab({ userName, upcomingBookings, stats }) {
  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome back, {userName}! 👋</CardTitle>
          <CardDescription className="font-medium text-gray-600">Here's what's happening with your bookings</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingBookings.slice(0, 4).map((booking) => (
              <div key={booking._id} className="rounded-xl border-2 border-gray-200 bg-white p-4 hover:shadow-xl hover:border-amber-300 transition-all duration-300 group">
                <div className="flex gap-3">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={booking.image} 
                      alt={booking.hotelName} 
                      className="h-20 w-20 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate text-gray-900 group-hover:text-amber-600 transition-colors">{booking.hotelName}</h4>
                    <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-1.5 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-amber-500" />
                      {booking.location}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                        <Calendar className="h-3.5 w-3.5 text-blue-500" />
                        {new Date(booking.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold border-0 shadow-sm">
                        {booking.nights} nights
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-3xl transition-all group">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
            <CardTitle className="text-sm font-bold text-gray-900">Booking Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{stats.totalBookings}</div>
            <p className="text-xs text-gray-600 font-semibold mt-2">Total Reservations</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-3xl transition-all group">
          <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
            <CardTitle className="text-sm font-bold text-gray-900">Total Spent</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${stats.totalSpent.toFixed(0)}</div>
            <p className="text-xs text-gray-600 font-semibold mt-2">All time expenses</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-3xl transition-all group">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-100">
            <CardTitle className="text-sm font-bold text-gray-900">Pending</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{stats.pendingPayments}</div>
            <p className="text-xs text-gray-600 font-semibold mt-2">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}