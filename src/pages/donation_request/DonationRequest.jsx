"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetRequestsByDonorQuery, useGetRequestsByUserQuery } from "@/redux-store/services/request-api"
import useAuth from "@/hooks/useAuth"
import {
   Search,
   MapPin,
   Calendar,
   Heart,
   FileText,
   Hospital,
   User,
   Users,
   Filter,
   RefreshCw,
   Clock,
   CheckCircle2,
   XCircle,
   AlertCircle,
   Sparkles,
   Droplet,
   X,
} from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"

const DonationRequest = () => {
   const { user } = useAuth()
   const [tab, setTab] = useState("mine")
   const [search, setSearch] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")

   const { data: requestsByMe, isLoading: loadingMine, refetch: refetchMine } = useGetRequestsByUserQuery(user?.id)
   const { data: requestsForMe, isLoading: loadingForMe, refetch: refetchForMe } = useGetRequestsByDonorQuery(user?.id)

   const currentRequestsData = useMemo(() => {
      const source = tab === "mine" ? requestsByMe?.data : requestsForMe?.data
      return Array.isArray(source) ? source : []
   }, [tab, requestsByMe, requestsForMe])

   // Calculate quick stats
   const stats = useMemo(() => {
      const total = currentRequestsData.length
      const pending = currentRequestsData.filter((r) => r.status?.toLowerCase() === "pending").length
      const approved = currentRequestsData.filter((r) => r.status?.toLowerCase() === "approved").length
      const completed = currentRequestsData.filter((r) => r.status?.toLowerCase() === "completed").length
      return { total, pending, approved, completed }
   }, [currentRequestsData])

   const filteredRequests = useMemo(() => {
      return currentRequestsData.filter((req) => {
         const matchesSearch =
            (req.hospital || "").toLowerCase().includes(search.toLowerCase()) ||
            (req.address || "").toLowerCase().includes(search.toLowerCase()) ||
            (req.note || "").toLowerCase().includes(search.toLowerCase())

         const matchesStatus =
            statusFilter === "all" || req.status?.toLowerCase() === statusFilter.toLowerCase()

         return matchesSearch && matchesStatus
      })
   }, [currentRequestsData, search, statusFilter])

   const getStatusConfig = (status) => {
      switch (status?.toLowerCase()) {
         case "pending":
            return {
               badge: "bg-amber-50 text-amber-700 border-amber-200",
               dot: "bg-amber-500",
               icon: Clock,
               border: "border-l-amber-500",
            }
         case "approved":
            return {
               badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
               dot: "bg-emerald-500",
               icon: CheckCircle2,
               border: "border-l-emerald-500",
            }
         case "completed":
            return {
               badge: "bg-sky-50 text-sky-700 border-sky-200",
               dot: "bg-sky-500",
               icon: CheckCircle2,
               border: "border-l-sky-500",
            }
         case "rejected":
            return {
               badge: "bg-rose-50 text-rose-700 border-rose-200",
               dot: "bg-rose-500",
               icon: XCircle,
               border: "border-l-rose-500",
            }
         default:
            return {
               badge: "bg-slate-100 text-slate-700 border-slate-200",
               dot: "bg-slate-400",
               icon: AlertCircle,
               border: "border-l-slate-400",
            }
      }
   }

   const renderCard = (request) => {
      const cfg = getStatusConfig(request.status)
      const StatusIcon = cfg.icon

      return (
         <Card
            key={request.id}
            className={`group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300 border-l-[6px] ${cfg.border} overflow-hidden`}
         >
            <CardHeader className="pb-3 pt-5 px-6">
               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                     <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Hospital className="h-5 w-5" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                           {request.hospital}
                        </h3>
                        {request.address && (
                           <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1">
                              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate max-w-sm sm:max-w-md">{request.address}</span>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="flex items-center gap-2 self-start">
                     <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.badge}`}
                     >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span className="capitalize">{request.status || "Pending"}</span>
                     </span>
                  </div>
               </div>
            </CardHeader>

            <CardContent className="px-6 pb-5 pt-1 space-y-4">
               {request.note && (
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-600 flex items-start gap-2.5">
                     <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                     <p className="leading-relaxed line-clamp-2">{request.note}</p>
                  </div>
               )}

               <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                     <Calendar className="h-3.5 w-3.5 text-slate-400" />
                     <span>
                        Created:{" "}
                        <strong className="text-slate-600">
                           {new Date(request.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                           })}
                        </strong>
                     </span>
                  </div>

                  <Button
                     variant="ghost"
                     size="sm"
                     className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold rounded-xl h-8 px-3 text-xs"
                  >
                     <Heart className="h-3.5 w-3.5 mr-1 fill-rose-100" />
                     View Details
                  </Button>
               </div>
            </CardContent>
         </Card>
      )
   }

   const renderLoadingSkeleton = () => (
      <div className="space-y-4">
         {[...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-3xl border border-slate-100 p-6 space-y-4">
               <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                     <Skeleton className="h-11 w-11 rounded-2xl" />
                     <div className="space-y-2">
                        <Skeleton className="h-5 w-48 rounded-lg" />
                        <Skeleton className="h-3.5 w-64 rounded-md" />
                     </div>
                  </div>
                  <Skeleton className="h-7 w-24 rounded-full" />
               </div>
               <Skeleton className="h-14 w-full rounded-2xl" />
               <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-3.5 w-28 rounded-md" />
                  <Skeleton className="h-7 w-24 rounded-xl" />
               </div>
            </Card>
         ))}
      </div>
   )

   const renderEmptyState = (type) => (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-200">
         <div className="mx-auto w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
            {type === "mine" ? (
               <User className="h-10 w-10 text-rose-500" />
            ) : (
               <Users className="h-10 w-10 text-rose-500" />
            )}
         </div>
         <h3 className="text-xl font-black text-slate-900 mb-1.5">
            {type === "mine" ? "No Requests Created Yet" : "No Requests Received Yet"}
         </h3>
         <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
            {type === "mine"
               ? "You haven't initiated any blood requests. When emergency needs arise, create one quickly."
               : "No incoming donation requests matched to your profile at this moment."}
         </p>
         <Button className="h-11 px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md shadow-rose-200 cursor-pointer">
            <Heart className="h-4 w-4 mr-2" />
            {type === "mine" ? "Create New Request" : "Browse Donors"}
         </Button>
      </div>
   )

   const isLoading = tab === "mine" ? loadingMine : loadingForMe
   const handleRefresh = () => (tab === "mine" ? refetchMine() : refetchForMe())

   return (
      <div className="min-h-screen bg-slate-50/40">
         <div className="main-container px-4 sm:px-6 py-8 space-y-6">
            {/* Header */}
            <SectionHeader
               badge="Donation Management"
               title="Manage Your"
               highlight="Blood Requests"
               subtitle="Coordinate emergency blood requests, verify recipient statuses, and help connect lives seamlessly."
               className="mb-4"
            />

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
               <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total</p>
                     <Droplet className="w-4 h-4 text-rose-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.total}</p>
               </div>

               <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending</p>
                     <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.pending}</p>
               </div>

               <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Approved</p>
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.approved}</p>
               </div>

               <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">Completed</p>
                     <Sparkles className="w-4 h-4 text-sky-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.completed}</p>
               </div>
            </div>

            {/* Tabs Control */}
            <Tabs value={tab} onValueChange={(val) => { setTab(val); setStatusFilter("all") }} className="w-full">
               <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-1.5 mb-6">
                  <TabsList className="grid grid-cols-2 w-full h-12 bg-slate-100/70 rounded-xl p-1">
                     <TabsTrigger
                        value="mine"
                        className="flex items-center justify-center gap-2 font-bold text-xs sm:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm cursor-pointer"
                     >
                        <User className="h-4 w-4 text-rose-600" />
                        My Requests
                        {requestsByMe?.data && (
                           <Badge variant="secondary" className="ml-1 text-[11px] font-bold bg-rose-50 text-rose-600">
                              {requestsByMe.data.length}
                           </Badge>
                        )}
                     </TabsTrigger>
                     <TabsTrigger
                        value="for-me"
                        className="flex items-center justify-center gap-2 font-bold text-xs sm:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm cursor-pointer"
                     >
                        <Users className="h-4 w-4 text-rose-600" />
                        Requests for Me
                        {requestsForMe?.data && (
                           <Badge variant="secondary" className="ml-1 text-[11px] font-bold bg-rose-50 text-rose-600">
                              {requestsForMe.data.length}
                           </Badge>
                        )}
                     </TabsTrigger>
                  </TabsList>
               </div>

               {/* Search & Status Filters */}
               <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 mb-6 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                     <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                           type="text"
                           placeholder="Search hospital name, location, or notes..."
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           className="pl-10 pr-9 h-11 bg-slate-50 border-slate-200 rounded-xl font-medium focus-visible:ring-rose-500"
                        />
                        {search && (
                           <button
                              type="button"
                              onClick={() => setSearch("")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                           >
                              <X className="h-4 w-4" />
                           </button>
                        )}
                     </div>

                     <Button
                        variant="outline"
                        onClick={handleRefresh}
                        className="h-11 px-4 border-slate-200 hover:bg-slate-50 font-bold rounded-xl flex items-center gap-2 cursor-pointer w-full sm:w-auto"
                     >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                     </Button>
                  </div>

                  {/* Status Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
                     {["all", "pending", "approved", "completed", "rejected"].map((st) => (
                        <button
                           key={st}
                           type="button"
                           onClick={() => setStatusFilter(st)}
                           className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                              statusFilter === st
                                 ? "bg-slate-900 text-white shadow-xs"
                                 : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                           }`}
                        >
                           {st}
                        </button>
                     ))}
                  </div>
               </div>

               <TabsContent value="mine" className="mt-0">
                  {isLoading ? (
                     renderLoadingSkeleton()
                  ) : filteredRequests.length > 0 ? (
                     <div className="grid gap-4">{filteredRequests.map(renderCard)}</div>
                  ) : search || statusFilter !== "all" ? (
                     <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8">
                        <Filter className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Requests</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto">
                           No requests match your current filters. Try searching with different terms or reset filters.
                        </p>
                        <Button
                           variant="outline"
                           onClick={() => {
                              setSearch("")
                              setStatusFilter("all")
                           }}
                           className="mt-4 rounded-xl border-slate-200 font-bold"
                        >
                           Clear Filters
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
                  ) : search || statusFilter !== "all" ? (
                     <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8">
                        <Filter className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Requests</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto">
                           No requests match your current filters. Try searching with different terms or reset filters.
                        </p>
                        <Button
                           variant="outline"
                           onClick={() => {
                              setSearch("")
                              setStatusFilter("all")
                           }}
                           className="mt-4 rounded-xl border-slate-200 font-bold"
                        >
                           Clear Filters
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
