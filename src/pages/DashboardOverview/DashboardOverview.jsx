"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetDashboardOverviewDataQuery } from "@/redux-store/services/user-api"
import {
   Heart,
   Send,
   Inbox,
   Clock,
   CheckCircle,
   XCircle,
   Droplets,
   TrendingUp,
   Calendar,
   Activity,
   Hospital,
   ArrowRight,

} from "lucide-react"
import useAuth from "@/hooks/useAuth"

const DashboardOverview = () => {
   const { user } = useAuth()
   const { data, isLoading, error } = useGetDashboardOverviewDataQuery({ id: user?.id })

   const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
         case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
         case "accepted":
            return "bg-green-100 text-green-800 border-green-200"
         case "declined":
            return "bg-red-100 text-red-800 border-red-200"
         case "donate":
            return "bg-blue-100 text-blue-800 border-blue-200"
         default:
            return "bg-gray-100 text-gray-800 border-gray-200"
      }
   }

   const getStatusIcon = (status) => {
      switch (status?.toLowerCase()) {
         case "pending":
            return <Clock className="h-4 w-4" />
         case "accepted":
            return <CheckCircle className="h-4 w-4" />
         case "declined":
            return <XCircle className="h-4 w-4" />
         case "donate":
            return <Droplets className="h-4 w-4" />
         default:
            return <Activity className="h-4 w-4" />
      }
   }

   const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      })
   }

   const formatFullDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
         month: "long",
         day: "numeric",
         year: "numeric",
      })
   }

   const calculateSuccessRate = () => {
      if (!data?.data) return 0
      const total = data.data.totalSentRequests
      const successful = data.data.accepted + data.data.donated
      return total > 0 ? Math.round((successful / total) * 100) : 0
   }

   if (isLoading) {
      return (
         <div className="min-h-screen">
            <div className="px-4 py-4 space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                     <Card key={i}>
                        <CardContent className="p-6">
                           <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                 <Skeleton className="h-4 w-20" />
                                 <Skeleton className="h-8 w-12" />
                              </div>
                              <Skeleton className="h-12 w-12 rounded-lg" />
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
               <CardContent className="p-6 text-center">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
                  <p className="text-gray-600 mb-4">Unable to load your dashboard data. Please try again.</p>

               </CardContent>
            </Card>
         </div>
      )
   }

   const dashboardData = data?.data

   return (
      <div className="min-h-screen bg-gray-50 pb-12">
         {/* Top Hero Section */}
         <div className="bg-white border-b px-4 md:px-8 py-8 mb-8 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "Hero"}!</h1>
                  <p className="text-gray-500 mt-1">Here's your donation impact and current status.</p>
               </div>
               <div className="flex flex-wrap gap-3">
                  <div className="bg-rose-50 text-rose-700 px-5 py-3 rounded-xl flex items-center gap-3 border border-rose-100">
                     <Droplets className="h-6 w-6" />
                     <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">Blood Group</p>
                        <p className="text-lg font-bold leading-none mt-1">{dashboardData?.bloodGroup || "O+"}</p>
                     </div>
                  </div>
                  <div className={`px-5 py-3 rounded-xl flex items-center gap-3 border ${dashboardData?.availableToDonate !== false ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                     {dashboardData?.availableToDonate !== false ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                     <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider ${dashboardData?.availableToDonate !== false ? 'text-emerald-600' : 'text-amber-600'}`}>Status</p>
                        <p className="text-sm font-bold leading-none mt-1">{dashboardData?.availableToDonate !== false ? 'Eligible to Donate' : 'In Recovery Period'}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Impact Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-rose-100 font-medium">Lives Saved</p>
                           <h2 className="text-4xl font-bold mt-1">{dashboardData?.livesSaved || 0}</h2>
                           <p className="text-sm text-rose-100 mt-2">Every drop counts towards saving a life.</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full">
                           <Heart className="h-8 w-8 text-white" />
                        </div>
                     </div>
                  </CardContent>
               </Card>
               
               <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex items-center gap-5">
                     <div className="bg-blue-50 p-4 rounded-full text-blue-600">
                        <Calendar className="h-8 w-8" />
                     </div>
                     <div>
                        <p className="text-sm text-gray-500 font-medium">Last Donation Date</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{dashboardData?.lastDonationDate ? formatFullDate(dashboardData.lastDonationDate) : "No record"}</h3>
                     </div>
                  </CardContent>
               </Card>

               <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex items-center gap-5">
                     <div className="bg-purple-50 p-4 rounded-full text-purple-600">
                        <Activity className="h-8 w-8" />
                     </div>
                     <div>
                        <p className="text-sm text-gray-500 font-medium">Next Eligible Date</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{dashboardData?.nextEligibleDate ? formatFullDate(dashboardData.nextEligibleDate) : "Ready Now!"}</h3>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <Card className="shadow-sm hover:shadow-md transition-shadow border-slate-100">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-500">Sent Requests</p>
                           <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData?.totalSentRequests || 0}</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                           <Send className="h-6 w-6 text-slate-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="shadow-sm hover:shadow-md transition-shadow border-slate-100">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-500">Received Requests</p>
                           <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData?.totalReceivedRequests || 0}</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                           <Inbox className="h-6 w-6 text-slate-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="shadow-sm hover:shadow-md transition-shadow border-slate-100">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-500">Successful Donations</p>
                           <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData?.donated || 0}</p>
                        </div>
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                           <Droplets className="h-6 w-6 text-rose-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="shadow-sm hover:shadow-md transition-shadow border-slate-100">
                  <CardContent className="p-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-500">Success Rate</p>
                           <p className="text-3xl font-bold text-gray-900 mt-1">{calculateSuccessRate()}%</p>
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                           <TrendingUp className="h-6 w-6 text-emerald-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
               <Card className="shadow-sm border-slate-100">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                     <CardTitle className="flex items-center gap-2 text-lg">
                        <Activity className="h-5 w-5 text-rose-600" />
                        Request Status Overview
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                           <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-yellow-600" />
                              <span className="font-medium text-gray-900">Pending</span>
                           </div>
                           <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              {dashboardData?.pending || 0}
                           </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                           <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="font-medium text-gray-900">Accepted</span>
                           </div>
                           <Badge className="bg-green-100 text-green-800 border-green-200">{dashboardData?.accepted || 0}</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                           <div className="flex items-center gap-3">
                              <XCircle className="h-5 w-5 text-red-600" />
                              <span className="font-medium text-gray-900">Declined</span>
                           </div>
                           <Badge className="bg-red-100 text-red-800 border-red-200">{dashboardData?.declined || 0}</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                           <div className="flex items-center gap-3">
                              <Droplets className="h-5 w-5 text-blue-600" />
                              <span className="font-medium text-gray-900">Donated</span>
                           </div>
                           <Badge className="bg-blue-100 text-blue-800 border-blue-200">{dashboardData?.donated || 0}</Badge>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Progress Chart */}
               <Card className="shadow-sm border-slate-100">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                     <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-rose-600" />
                        Activity Summary
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-6">
                        <div className="text-center">
                           <div className="text-4xl font-bold text-rose-600 mb-2">{dashboardData?.donated || 0}</div>
                           <p className="text-gray-600">Lives Potentially Saved</p>
                        </div>

                        <div className="space-y-3">
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Success Rate</span>
                              <span className="font-medium">{calculateSuccessRate()}%</span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                 className="bg-rose-600 h-2 rounded-full transition-all duration-500"
                                 style={{ width: `${calculateSuccessRate()}%` }}
                              ></div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                           <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{dashboardData?.totalSentRequests || 0}</div>
                              <p className="text-xs text-gray-600">Total Requests</p>
                           </div>
                           <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{dashboardData?.totalReceivedRequests || 0}</div>
                              <p className="text-xs text-gray-600">Received</p>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
               {/* Recent Sent Requests */}
               <Card className="shadow-sm border-slate-100">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                     <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                           <Send className="h-5 w-5 text-rose-600" />
                           Recent Sent Requests
                        </div>
                        <Button variant="ghost" size="sm">
                           View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     {dashboardData?.recentSentRequests?.length > 0 ? (
                        <div className="space-y-4">
                           {dashboardData.recentSentRequests.map((request) => (
                              <div key={request.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all rounded-xl">
                                 <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
                                       <Hospital className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div>
                                       <p className="font-semibold text-gray-900">{request.hospital}</p>
                                       <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                          <Calendar className="h-3.5 w-3.5" />
                                          {formatDate(request.createdAt)}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-1.5">
                                    <Badge className={getStatusColor(request.status)}>
                                       {getStatusIcon(request.status)}
                                       <span className="ml-1 capitalize">{request.status}</span>
                                    </Badge>
                                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">{request.blood_group}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className="text-center py-8">
                           <Send className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                           <p className="text-gray-500">No recent sent requests</p>
                        </div>
                     )}
                  </CardContent>
               </Card>

               {/* Recent Received Requests */}
               <Card className="shadow-sm border-slate-100">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                     <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                           <Inbox className="h-5 w-5 text-rose-600" />
                           Recent Received Requests
                        </div>
                        <Button variant="ghost" size="sm">
                           View All <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     {dashboardData?.recentReceivedRequests?.length > 0 ? (
                        <div className="space-y-4">
                           {dashboardData.recentReceivedRequests.map((request) => (
                              <div key={request.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all rounded-xl">
                                 <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
                                       <Hospital className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div>
                                       <p className="font-semibold text-gray-900">{request.hospital}</p>
                                       <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                                          <Calendar className="h-3.5 w-3.5" />
                                          {formatDate(request.createdAt)}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-1.5">
                                    <Badge className={getStatusColor(request.status)}>
                                       {getStatusIcon(request.status)}
                                       <span className="ml-1 capitalize">{request.status}</span>
                                    </Badge>
                                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">{request.blood_group}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className="text-center py-8">
                           <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                           <p className="text-gray-500">No recent received requests</p>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default DashboardOverview
