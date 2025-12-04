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
   const { data, isLoading, error } = useGetDashboardOverviewDataQuery({ id: user?._id })

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

   const calculateSuccessRate = () => {
      if (!data?.data) return 0
      const total = data.data.totalSentRequests
      const successful = data.data.accepted + data.data.donated
      return total > 0 ? Math.round((successful / total) * 100) : 0
   }

   if (isLoading) {
      return (
         <div className="min-h-screen bg-gray-50 p-6">
            <div className="main-container space-y-6">
               <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-10 w-24" />
               </div>
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
      <div className="min-h-screen bg-gray-50">
         <div className=" px-4 py-4">


            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
               <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Sent Requests</p>
                           <p className="text-3xl font-bold text-gray-900">{dashboardData?.totalSentRequests || 0}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                           <Send className="h-6 w-6 text-blue-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Received Requests</p>
                           <p className="text-3xl font-bold text-gray-900">{dashboardData?.totalReceivedRequests || 0}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                           <Inbox className="h-6 w-6 text-green-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Successful Donations</p>
                           <p className="text-3xl font-bold text-gray-900">{dashboardData?.donated || 0}</p>
                        </div>
                        <div className="p-3 bg-rose-50 rounded-lg">
                           <Heart className="h-6 w-6 text-rose-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium text-gray-600">Success Rate</p>
                           <p className="text-3xl font-bold text-gray-900">{calculateSuccessRate()}%</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                           <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
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
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-rose-600" />
                        Impact Summary
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {/* Recent Sent Requests */}
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center justify-between">
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
                        <div className="space-y-3">
                           {dashboardData.recentSentRequests.map((request) => (
                              <div key={request._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                 <div className="flex items-center gap-3">
                                    <Hospital className="h-5 w-5 text-gray-600" />
                                    <div>
                                       <p className="font-medium text-gray-900">{request.hospital}</p>
                                       <div className="flex items-center gap-1 text-sm text-gray-500">
                                          <Calendar className="h-3 w-3" />
                                          {formatDate(request.createdAt)}
                                       </div>
                                    </div>
                                 </div>
                                 <Badge className={getStatusColor(request.status)}>
                                    {getStatusIcon(request.status)}
                                    <span className="ml-1 capitalize">{request.status}</span>
                                 </Badge>
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
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center justify-between">
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
                        <div className="space-y-3">
                           {dashboardData.recentReceivedRequests.map((request) => (
                              <div key={request._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                 <div className="flex items-center gap-3">
                                    <Hospital className="h-5 w-5 text-gray-600" />
                                    <div>
                                       <p className="font-medium text-gray-900">{request.hospital}</p>
                                       <div className="flex items-center gap-1 text-sm text-gray-500">
                                          <Calendar className="h-3 w-3" />
                                          {formatDate(request.createdAt)}
                                       </div>
                                    </div>
                                 </div>
                                 <Badge className={getStatusColor(request.status)}>
                                    {getStatusIcon(request.status)}
                                    <span className="ml-1 capitalize">{request.status}</span>
                                 </Badge>
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
