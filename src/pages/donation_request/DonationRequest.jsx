"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetRequestsByDonorQuery, useGetRequestsByUserQuery } from "@/redux-store/services/request-api"
import useAuth from "@/hooks/useAuth"
import { Search, MapPin, Calendar, Heart, FileText, Hospital, User, Users, Filter, RefreshCw } from "lucide-react"

const DonationRequest = () => {
   const { user } = useAuth()
   const [tab, setTab] = useState("mine")
   const [search, setSearch] = useState("")

   const { data: requestsByMe, isLoading: loadingMine, refetch: refetchMine } = useGetRequestsByUserQuery(user?._id)
   const { data: requestsForMe, isLoading: loadingForMe, refetch: refetchForMe } = useGetRequestsByDonorQuery(user?._id)

   const filterRequests = (requests) => {
      if (!requests?.data) return []
      return requests.data.filter(
         (req) =>
            req.hospital.toLowerCase().includes(search.toLowerCase()) ||
            req.address?.toLowerCase().includes(search.toLowerCase()) ||
            req.note.toLowerCase().includes(search.toLowerCase()),
      )
   }

   const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
         case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
         case "approved":
            return "bg-green-100 text-green-800 border-green-200"
         case "rejected":
            return "bg-red-100 text-red-800 border-red-200"
         case "completed":
            return "bg-blue-100 text-blue-800 border-blue-200"
         default:
            return "bg-gray-100 text-gray-800 border-gray-200"
      }
   }

   const renderCard = (request) => (
      <Card key={request._id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-rose-500">
         <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                     <Hospital className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                        {request.hospital}
                     </h3>
                     <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{request.address}</span>
                     </div>
                  </div>
               </div>
               <Badge className={`${getStatusColor(request.status)} font-medium`}>{request.status}</Badge>
            </div>
         </CardHeader>
         <CardContent className="pt-0">
            <div className="space-y-3">
               <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">{request.note}</p>
               </div>

               <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                     <Calendar className="h-3 w-3" />
                     <span>
                        {new Date(request.createdAt).toLocaleDateString("en-US", {
                           year: "numeric",
                           month: "short",
                           day: "numeric",
                        })}
                     </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                     <Heart className="h-4 w-4 mr-1" />
                     View Details
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   )

   const renderLoadingSkeleton = () => (
      <div className="space-y-4">
         {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-l-4 border-l-gray-200">
               <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                     <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <div className="space-y-2">
                           <Skeleton className="h-5 w-32" />
                           <Skeleton className="h-4 w-48" />
                        </div>
                     </div>
                     <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
               </CardHeader>
               <CardContent className="pt-0">
                  <div className="space-y-3">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                     <div className="flex items-center justify-between pt-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-8 w-24 rounded" />
                     </div>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
   )

   const renderEmptyState = (type) => (
      <div className="text-center py-12">
         <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {type === "mine" ? <User className="h-12 w-12 text-gray-400" /> : <Users className="h-12 w-12 text-gray-400" />}
         </div>
         <h3 className="text-lg font-medium text-gray-900 mb-2">
            {type === "mine" ? "No requests created yet" : "No requests received yet"}
         </h3>
         <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            {type === "mine"
               ? "You haven't created any donation requests yet. Start by creating your first request."
               : "You haven't received any donation requests yet. They will appear here when available."}
         </p>
         <Button className="bg-rose-600 hover:bg-rose-700">
            <Heart className="h-4 w-4 mr-2" />
            {type === "mine" ? "Create Request" : "Browse Requests"}
         </Button>
      </div>
   )

   const currentRequests = tab === "mine" ? requestsByMe : requestsForMe
   const filteredRequests = filterRequests(currentRequests)
   const isLoading = tab === "mine" ? loadingMine : loadingForMe

   return (
      <div className="min-h-screen">
         <div className="px-5 py-4">
            {/* Header */}
            <div className="text-center mb-8">
               <div className="inline-flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
                  <Heart className="h-5 w-5 text-rose-600" />
                  <span className="text-sm font-medium text-rose-600">Donation Management</span>
               </div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation Requests</h1>
               <p className="text-gray-600 max-w-2xl mx-auto">
                  Manage your donation requests and help save lives by connecting with those in need.
               </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
               <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                     <Input
                        type="text"
                        placeholder="Search by hospital, address, or notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-rose-500 focus:ring-rose-500"
                     />
                  </div>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => (tab === "mine" ? refetchMine() : refetchForMe())}
                     className="flex items-center gap-2"
                  >
                     <RefreshCw className="h-4 w-4" />
                     Refresh
                  </Button>
               </div>
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab} className="w-full">
               <div className="bg-white rounded-lg shadow-sm border mb-6">
                  <TabsList className="grid grid-cols-2 w-full h-12 bg-gray-50 rounded-lg p-1">
                     <TabsTrigger
                        value="mine"
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                     >
                        <User className="h-4 w-4" />
                        My Requests
                        {requestsByMe?.data && (
                           <Badge variant="secondary" className="ml-1 text-xs">
                              {requestsByMe.data.length}
                           </Badge>
                        )}
                     </TabsTrigger>
                     <TabsTrigger
                        value="for-me"
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                     >
                        <Users className="h-4 w-4" />
                        Requests for Me
                        {requestsForMe?.data && (
                           <Badge variant="secondary" className="ml-1 text-xs">
                              {requestsForMe.data.length}
                           </Badge>
                        )}
                     </TabsTrigger>
                  </TabsList>
               </div>

               <TabsContent value="mine" className="mt-0">
                  {isLoading ? (
                     renderLoadingSkeleton()
                  ) : filteredRequests.length > 0 ? (
                     <div className="grid gap-4">{filteredRequests.map(renderCard)}</div>
                  ) : search ? (
                     <div className="text-center py-12">
                        <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500">
                           Try adjusting your search terms or clear the search to see all requests.
                        </p>
                        <Button variant="outline" onClick={() => setSearch("")} className="mt-4">
                           Clear Search
                        </Button>
                     </div>
                  ) : (
                     renderEmptyState("mine")
                  )}
               </TabsContent>

               <TabsContent value="for-me" className="mt-0">
                  {isLoading ? (
                     renderLoadingSkeleton()
                  ) : filteredRequests.length > 0 ? (
                     <div className="grid gap-4">{filteredRequests.map(renderCard)}</div>
                  ) : search ? (
                     <div className="text-center py-12">
                        <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500">
                           Try adjusting your search terms or clear the search to see all requests.
                        </p>
                        <Button variant="outline" onClick={() => setSearch("")} className="mt-4">
                           Clear Search
                        </Button>
                     </div>
                  ) : (
                     renderEmptyState("for-me")
                  )}
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

export default DonationRequest
