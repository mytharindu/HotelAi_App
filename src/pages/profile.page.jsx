import { useUser } from '@clerk/clerk-react'
import { Loader2, User, Hotel, Settings, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { useState } from "react"
import { ProfileSidebar } from "@/components/profile/ProfileSidebar"
import { OverviewTab } from "@/components/profile/OverviewTab"
import { BookingsTab } from "@/components/profile/BookingsTab"
import { ProfileInfoTab } from "@/components/profile/ProfileInfoTab"
import { SettingsTab } from "@/components/profile/SettingsTab"
import { useGetUserBookingsQuery } from "@/lib/api"
import { motion } from "framer-motion";

function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [filter, setFilter] = useState("all")
  
  // Fetch real user bookings
  const { data: bookings = [], isLoading: isLoadingBookings, isError } = useGetUserBookingsQuery()

  // Process bookings to add status
  const processedBookings = bookings.map((booking) => {
    const checkInDate = new Date(booking.checkIn)
    const checkOutDate = new Date(booking.checkOut)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let status = 'upcoming'
    if (checkOutDate < today) {
      status = 'completed'
    } else if (checkInDate <= today && checkOutDate >= today) {
      status = 'active'
    }

    // Calculate nights
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))

    return {
      ...booking,
      status,
      nights,
      hotelName: booking.hotelId?.name || 'Unknown Hotel',
      location: booking.hotelId?.location || 'Unknown Location',
      image: booking.hotelId?.image || 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=400',
    }
  })

  // Filter bookings
  const filteredBookings = processedBookings.filter((booking) => {
    if (filter === "all") return true
    if (filter === "upcoming") return booking.status === "upcoming" || booking.status === "active"
    if (filter === "completed") return booking.status === "completed"
    if (filter === "paid") return booking.paymentStatus === "PAID"
    if (filter === "pending") return booking.paymentStatus === "PENDING"
    return true
  })

  // Calculate stats
  const stats = {
    totalBookings: processedBookings.length,
    upcomingBookings: processedBookings.filter(b => b.status === "upcoming" || b.status === "active").length,
    completedBookings: processedBookings.filter(b => b.status === "completed").length,
    totalSpent: processedBookings.filter(b => b.paymentStatus === "PAID").reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    pendingPayments: processedBookings.filter(b => b.paymentStatus === "PENDING").length
  }

  const upcomingBookings = processedBookings.filter(b => b.status === "upcoming" || b.status === "active")

  if (!isLoaded || isLoadingBookings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Card className="w-full max-w-md shadow-2xl border-2 border-gray-200 rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
            <CardTitle className="text-2xl font-bold text-gray-900">Please Sign In</CardTitle>
            <CardDescription className="font-medium">You need to be signed in to view your profile</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Card className="w-full max-w-md shadow-2xl border-2 border-red-200 rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
            <CardTitle className="text-2xl font-bold text-gray-900">Error Loading Bookings</CardTitle>
            <CardDescription className="font-medium">Unable to fetch your booking data. Please try again later.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative pb-32 pt-8"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

        <div className="container relative mx-auto px-4">
          <div className="flex items-center justify-start gap-4">
            <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">My Profile</h1>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] relative -mt-24">
          <ProfileSidebar user={user} stats={stats} />

          <main className="space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <Card className="shadow-2xl border-2 border-gray-200 mb-6 rounded-2xl overflow-hidden">
                <CardContent className="p-3">
                  <TabsList className="grid w-full grid-cols-4 h-auto bg-gradient-to-r from-gray-50 to-slate-50 gap-2 p-1 rounded-xl">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 py-2.5 rounded-lg font-semibold transition-all hover:bg-white/80"
                    >
                      <Package className="h-4 w-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="bookings" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 py-2.5 rounded-lg font-semibold transition-all hover:bg-white/80"
                    >
                      <Hotel className="h-4 w-4" />
                      <span className="hidden sm:inline">Bookings</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="profile" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 py-2.5 rounded-lg font-semibold transition-all hover:bg-white/80"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 py-2.5 rounded-lg font-semibold transition-all hover:bg-white/80"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>

              <TabsContent value="overview" className="mt-0">
                <OverviewTab 
                  userName={user.firstName || "Guest"}
                  upcomingBookings={upcomingBookings}
                  stats={stats}
                />
              </TabsContent>

              <TabsContent value="bookings" className="mt-0">
                <BookingsTab 
                  bookings={filteredBookings}
                  filter={filter}
                  onFilterChange={setFilter}
                />
              </TabsContent>

              <TabsContent value="profile" className="mt-0">
                <ProfileInfoTab user={user} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <SettingsTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;