import { User as UserIcon, Calendar, CreditCard, Hotel, Mail, Edit, ChevronRight, Bell, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function ProfileSidebar({ user, stats }) {
  return (
    <aside className="space-y-6">
      <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden">
        <CardContent className="pt-6 bg-gradient-to-b from-white to-gray-50">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <Avatar className="h-28 w-28 border-4 border-white shadow-xl ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
                <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-2xl text-white font-bold">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.fullName || "Guest User"}</h2>
            {user.primaryEmailAddress?.emailAddress && (
              <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-2 font-medium bg-gray-100 px-3 py-1 rounded-full">
                <Mail className="h-3.5 w-3.5 text-amber-500" />
                {user.primaryEmailAddress.emailAddress}
              </p>
            )}
            <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className="w-full space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <span className="text-gray-700 flex items-center gap-2 font-semibold">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  Member since
                </span>
                <span className="font-bold text-gray-900">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {month: "short", year: "numeric"}) : "Recent"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <span className="text-gray-700 flex items-center gap-2 font-semibold">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Hotel className="h-4 w-4 text-blue-600" />
                  </div>
                  Total bookings
                </span>
                <span className="font-bold text-gray-900">{stats.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <span className="text-gray-700 flex items-center gap-2 font-semibold">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-green-600" />
                  </div>
                  Total spent
                </span>
                <span className="font-bold text-gray-900">${stats.totalSpent.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden hidden lg:block">
        <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-100">
          <CardTitle className="text-lg font-bold text-gray-900">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 p-4 text-center border-2 border-blue-200 hover:scale-105 transition-transform shadow-md">
              <div className="text-3xl font-bold text-blue-600">{stats.upcomingBookings}</div>
              <div className="text-xs text-gray-700 font-semibold mt-1">Upcoming</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 p-4 text-center border-2 border-green-200 hover:scale-105 transition-transform shadow-md">
              <div className="text-3xl font-bold text-green-600">{stats.completedBookings}</div>
              <div className="text-xs text-gray-700 font-semibold mt-1">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}