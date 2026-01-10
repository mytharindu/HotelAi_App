import { User as UserIcon, Mail, Phone, Calendar, MapPin, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProfileInfoTab({ user }) {
  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-2 border-gray-200 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-900">Personal Information</CardTitle>
          <CardDescription className="font-medium text-gray-600">Your account details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-amber-600" />
                </div>
                First Name
              </label>
              <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-4 hover:border-amber-300 transition-colors">
                <p className="text-sm font-semibold text-gray-900">{user.firstName || "Not set"}</p>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-orange-600" />
                </div>
                Last Name
              </label>
              <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-4 hover:border-amber-300 transition-colors">
                <p className="text-sm font-semibold text-gray-900">{user.lastName || "Not set"}</p>
              </div>
            </div>
            <div className="space-y-3 sm:col-span-2">
              <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                Email Address
              </label>
              <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 p-4 hover:border-amber-300 transition-colors">
                <p className="text-sm font-semibold text-gray-900">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}