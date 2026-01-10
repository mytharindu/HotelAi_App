import { Calendar, MapPin, Hotel, Clock, User, Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function BookingCard({ booking }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/booking/complete?session_id=${booking.stripeSessionId}`)
  }

  const handlePayNow = () => {
    navigate(`/booking/payment?bookingId=${booking._id}`)
  }

  const getStatusBadge = () => {
    if (booking.paymentStatus === "PAID") {
      return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-md border-0">PAID ✓</Badge>
    }
    return <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md border-0">PENDING</Badge>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className="rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-amber-300 transition-all duration-300 bg-white group">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
          <img 
            src={booking.image} 
            alt={booking.hotelName} 
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {booking.status === "active" && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg border-0">🔵 Active</Badge>
            </div>
          )}
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold truncate text-gray-900 group-hover:text-amber-600 transition-colors">{booking.hotelName}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-1.5 font-medium">
                <MapPin className="h-4 w-4 text-amber-500" />
                {booking.location}
              </p>
            </div>
            {getStatusBadge()}
          </div>
          
          {/* Customer Info */}
          {booking.paymentStatus === "PAID" && (booking.customerName || booking.customerEmail || booking.customerPhone) && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border-2 border-blue-200">
              <div className="space-y-2">
                {booking.customerName && (
                  <p className="text-sm text-gray-800 flex items-center gap-2 font-medium">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-bold">Guest:</span> {booking.customerName}
                  </p>
                )}
                {booking.customerEmail && (
                  <p className="text-sm text-gray-800 flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-bold">Email:</span> {booking.customerEmail}
                  </p>
                )}
                {booking.customerPhone && (
                  <p className="text-sm text-gray-800 flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="font-bold">Phone:</span> {booking.customerPhone}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-600">Check-in</p>
                <p className="text-gray-900 text-xs font-semibold">
                  {formatDate(booking.checkIn)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-600">Check-out</p>
                <p className="text-gray-900 text-xs font-semibold">
                  {formatDate(booking.checkOut)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Hotel className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-600">Room</p>
                <p className="text-gray-900 text-xs font-semibold">#{booking.roomNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-600">Duration</p>
                <p className="text-gray-900 text-xs font-semibold">{booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t-2 border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600 font-semibold">Total:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ${booking.totalAmount ? booking.totalAmount.toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {booking.paymentStatus === "PAID" && booking.stripeSessionId && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewDetails}
                  className="border-2 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  View Details
                </Button>
              )}
              {booking.paymentStatus === "PENDING" && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  onClick={handlePayNow}
                >
                  Pay Now
                </Button>
              )}
              {booking.status === "upcoming" && booking.paymentStatus === "PAID" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/hotels/${booking.hotelId._id}`)}
                  className="border-2 font-semibold hover:bg-amber-50 hover:border-amber-400 transition-all"
                >
                  View Hotel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}