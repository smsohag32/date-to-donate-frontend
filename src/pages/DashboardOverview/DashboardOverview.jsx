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
   CheckCircle2,
   XCircle,
   Droplets,
   TrendingUp,
   Calendar,
   Activity,
   Hospital,
   ArrowRight,
   PhoneCall,
   Search,
   Plus,
   ShieldCheck,
   Sparkles,
   AlertCircle,
   UserCheck,
   RefreshCw
} from "lucide-react"
import useAuth from "@/hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"

const DashboardOverview = () => {
   const { user } = useAuth()
   const navigate = useNavigate()
   const { data, isLoading, error, refetch } = useGetDashboardOverviewDataQuery({ id: user?.id })

   const getStatusBadge = (status) => {
      switch (status?.toLowerCase()) {
         case "pending":
            return {
               bg: "bg-amber-50 text-amber-700 border-amber-200/80",
               icon: <Clock className="h-3.5 w-3.5 text-amber-500" />
            }
         case "accepted":
            return {
               bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
               icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            }
         case "declined":
            return {
               bg: "bg-rose-50 text-rose-700 border-rose-200/80",
               icon: <XCircle className="h-3.5 w-3.5 text-rose-500" />
            }
         case "donate":
         case "donated":
            return {
               bg: "bg-blue-50 text-blue-700 border-blue-200/80",
               icon: <Droplets className="h-3.5 w-3.5 text-blue-500" />
            }
         default:
            return {
               bg: "bg-slate-50 text-slate-700 border-slate-200",
               icon: <Activity className="h-3.5 w-3.5 text-slate-500" />
            }
      }
   }

   const formatDate = (dateString) => {
      if (!dateString) return "N/A"
      try {
         return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
         })
      } catch {
         return dateString
      }
   }

   const formatFullDate = (dateString) => {
      if (!dateString) return "No record"
      try {
         return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
         })
      } catch {
         return dateString
      }
   }

   const calculateSuccessRate = () => {
      if (!data?.data) return 0
      const total = data.data.totalSentRequests || 0
      const successful = (data.data.accepted || 0) + (data.data.donated || 0)
      return total > 0 ? Math.round((successful / total) * 100) : 0
   }

   if (isLoading) {
      return (
         <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            {/* Hero Skeleton */}
            <div className="h-44 rounded-2xl bg-white border border-slate-200/60 p-6 flex flex-col justify-between animate-pulse">
               <div className="space-y-3">
                  <Skeleton className="h-8 w-64 rounded-lg" />
                  <Skeleton className="h-4 w-96 rounded-md" />
               </div>
               <div className="flex gap-4">
                  <Skeleton className="h-10 w-32 rounded-xl" />
                  <Skeleton className="h-10 w-32 rounded-xl" />
               </div>
            </div>

            {/* Metric Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
               {[...Array(4)].map((_, i) => (
                  <Card key={i} className="border-slate-200/60 shadow-xs">
                     <CardContent className="p-6 space-y-3">
                        <div className="flex justify-between items-center">
                           <Skeleton className="h-4 w-24 rounded" />
                           <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded" />
                        <Skeleton className="h-3 w-32 rounded" />
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Split Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <Card className="border-slate-200/60 shadow-xs h-64">
                  <CardContent className="p-6">
                     <Skeleton className="h-full w-full rounded-xl" />
                  </CardContent>
               </Card>
               <Card className="border-slate-200/60 shadow-xs h-64">
                  <CardContent className="p-6">
                     <Skeleton className="h-full w-full rounded-xl" />
                  </CardContent>
               </Card>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="min-h-[70vh] flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-rose-200 shadow-md">
               <CardContent className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                     <AlertCircle className="h-7 w-7" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-slate-900">Unable to load dashboard data</h3>
                     <p className="text-sm text-slate-500 mt-1">There was a problem contacting the server. Please try again.</p>
                  </div>
                  <Button
                     onClick={() => refetch()}
                     className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl gap-2 cursor-pointer">
                     <RefreshCw className="h-4 w-4" />
                     Retry Connection
                  </Button>
               </CardContent>
            </Card>
         </div>
      )
   }

   const dashboardData = data?.data
   const displayName = user?.name || user?.first_name || "Life Saver"
   const bloodGroup = dashboardData?.bloodGroup || user?.blood_group || "O+"
   const isEligible = dashboardData?.availableToDonate !== false
   const successRate = calculateSuccessRate()

   // Calculate status totals for distribution percentages
   const pendingCount = dashboardData?.pending || 0
   const acceptedCount = dashboardData?.accepted || 0
   const declinedCount = dashboardData?.declined || 0
   const donatedCount = dashboardData?.donated || 0
   const totalRequests = pendingCount + acceptedCount + declinedCount + donatedCount || 1

   const getPercentage = (count) => Math.round((count / totalRequests) * 100)

   return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-300">
         
         {/* Modern Hero Welcome Banner */}
         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 text-white p-6 sm:p-8 shadow-md border border-slate-800">
            {/* Subtle background glow effects */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
               <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                     <Sparkles className="w-3.5 h-3.5" />
                     <span>Welcome Back to Dare to Donate</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                     Hello, {displayName}! 👋
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                     Thank you for being a committed lifesaver. Here is your donation footprint and real-time community requests.
                  </p>

                  {/* Hero Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                     <Button
                        onClick={() => navigate("/dashboard/find-donors")}
                        className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md shadow-rose-600/30 text-xs sm:text-sm font-semibold cursor-pointer">
                        <Search className="w-4 h-4 mr-1.5" />
                        Find Donors
                     </Button>

                     <Button
                        onClick={() => navigate("/dashboard/donation_request")}
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer">
                        <Plus className="w-4 h-4 mr-1.5" />
                        Request Blood
                     </Button>

                     <Button
                        onClick={() => navigate("/dashboard/profile")}
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl text-xs sm:text-sm font-medium cursor-pointer">
                        <UserCheck className="w-4 h-4 mr-1.5" />
                        My Profile
                     </Button>
                  </div>
               </div>

               {/* Right Hero Status Chips */}
               <div className="flex flex-row sm:flex-col lg:flex-row gap-3 w-full lg:w-auto">
                  {/* Blood Group Badge */}
                  <div className="flex-1 sm:flex-none flex items-center gap-3.5 p-3.5 sm:px-5 sm:py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
                     <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
                        <Droplets className="w-6 h-6 animate-pulse" />
                     </div>
                     <div>
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-rose-300">Blood Group</span>
                        <p className="text-xl sm:text-2xl font-black text-white leading-tight">{bloodGroup}</p>
                     </div>
                  </div>

                  {/* Donor Eligibility Badge */}
                  <div className="flex-1 sm:flex-none flex items-center gap-3.5 p-3.5 sm:px-5 sm:py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
                     <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                        isEligible ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                     }`}>
                        {isEligible ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                     </div>
                     <div>
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-300">Eligibility</span>
                        <div className="flex items-center gap-1.5 leading-tight">
                           <span className={`w-2 h-2 rounded-full ${isEligible ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
                           <p className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
                              {isEligible ? "Ready to Donate" : "In Recovery"}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Impact Metric Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Lives Saved Card */}
            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-rose-600 via-rose-500 to-rose-700 text-white shadow-lg shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 transition-all duration-300">
               <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                     <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-rose-100">Impact</span>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                           {dashboardData?.livesSaved || (dashboardData?.donated ? dashboardData.donated * 3 : 0)}
                        </h3>
                     </div>
                     <div className="p-3 rounded-xl bg-white/15 backdrop-blur-md">
                        <Heart className="h-6 w-6 text-white fill-white" />
                     </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs text-rose-100 flex items-center justify-between">
                     <span>Lives Saved & Touched</span>
                     <span className="font-semibold text-white">Hero Tier</span>
                  </div>
               </CardContent>
            </Card>

            {/* Last Donation */}
            <Card className="border-slate-200/80 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
               <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                     <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Donation</span>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">
                           {dashboardData?.lastDonationDate ? formatDate(dashboardData.lastDonationDate) : "No Record"}
                        </h4>
                     </div>
                     <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                        <Calendar className="h-6 w-6" />
                     </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                     <span>Recorded Date</span>
                     <span className="font-medium text-slate-700">{formatFullDate(dashboardData?.lastDonationDate)}</span>
                  </div>
               </CardContent>
            </Card>

            {/* Next Eligible Date */}
            <Card className="border-slate-200/80 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
               <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                     <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Next Eligible</span>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">
                           {dashboardData?.nextEligibleDate ? formatDate(dashboardData.nextEligibleDate) : "Ready Now!"}
                        </h4>
                     </div>
                     <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                        <Activity className="h-6 w-6" />
                     </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                     <span>Status</span>
                     <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {dashboardData?.nextEligibleDate ? "Upcoming" : "Available"}
                     </span>
                  </div>
               </CardContent>
            </Card>

            {/* Success Rate */}
            <Card className="border-slate-200/80 bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
               <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                     <div className="space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Success Rate</span>
                        <h3 className="text-3xl font-extrabold text-slate-900">{successRate}%</h3>
                     </div>
                     <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <TrendingUp className="h-6 w-6" />
                     </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                     <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                           className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-700"
                           style={{ width: `${Math.max(successRate, 5)}%` }}
                        />
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Secondary Stats Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
               <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                  <Send className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-medium text-slate-500">Sent Requests</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{dashboardData?.totalSentRequests || 0}</p>
               </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
               <div className="p-3 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
                  <Inbox className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-medium text-slate-500">Received Requests</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{dashboardData?.totalReceivedRequests || 0}</p>
               </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
               <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 shrink-0">
                  <Droplets className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-medium text-slate-500">Completed Donations</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{dashboardData?.donated || 0}</p>
               </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
               <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                  <Clock className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-medium text-slate-500">Pending Actions</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{dashboardData?.pending || 0}</p>
               </div>
            </div>
         </div>

         {/* Status Overview & Activity Summary */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Status Overview Card */}
            <Card className="border-slate-200/80 bg-white shadow-xs">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                     <Activity className="h-5 w-5 text-rose-600" />
                     Request Status Breakdown
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-4">
                  {/* Pending */}
                  <div className="space-y-1.5">
                     <div className="flex justify-between items-center text-sm font-medium">
                        <span className="flex items-center gap-2 text-slate-700">
                           <Clock className="w-4 h-4 text-amber-500" />
                           Pending Responses
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold text-slate-500">{getPercentage(pendingCount)}%</span>
                           <Badge className="bg-amber-100 text-amber-800 border-none font-bold text-xs px-2">{pendingCount}</Badge>
                        </div>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPercentage(pendingCount)}%` }} />
                     </div>
                  </div>

                  {/* Accepted */}
                  <div className="space-y-1.5">
                     <div className="flex justify-between items-center text-sm font-medium">
                        <span className="flex items-center gap-2 text-slate-700">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           Accepted by Donors
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold text-slate-500">{getPercentage(acceptedCount)}%</span>
                           <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-xs px-2">{acceptedCount}</Badge>
                        </div>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPercentage(acceptedCount)}%` }} />
                     </div>
                  </div>

                  {/* Donated */}
                  <div className="space-y-1.5">
                     <div className="flex justify-between items-center text-sm font-medium">
                        <span className="flex items-center gap-2 text-slate-700">
                           <Droplets className="w-4 h-4 text-blue-500" />
                           Completed Donations
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold text-slate-500">{getPercentage(donatedCount)}%</span>
                           <Badge className="bg-blue-100 text-blue-800 border-none font-bold text-xs px-2">{donatedCount}</Badge>
                        </div>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPercentage(donatedCount)}%` }} />
                     </div>
                  </div>

                  {/* Declined */}
                  <div className="space-y-1.5">
                     <div className="flex justify-between items-center text-sm font-medium">
                        <span className="flex items-center gap-2 text-slate-700">
                           <XCircle className="w-4 h-4 text-rose-500" />
                           Declined / Unavailable
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-semibold text-slate-500">{getPercentage(declinedCount)}%</span>
                           <Badge className="bg-rose-100 text-rose-800 border-none font-bold text-xs px-2">{declinedCount}</Badge>
                        </div>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getPercentage(declinedCount)}%` }} />
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Activity Summary & Donor Health Guidance */}
            <Card className="border-slate-200/80 bg-white shadow-xs">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                     <TrendingUp className="h-5 w-5 text-rose-600" />
                     Donation Health & Activity Guide
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-3.5">
                     <div className="p-2 rounded-lg bg-rose-600 text-white shrink-0 mt-0.5">
                        <Droplets className="w-4 h-4" />
                     </div>
                     <div>
                        <h5 className="text-sm font-bold text-slate-900">Pre-Donation Hydration Tip</h5>
                        <p className="text-xs text-slate-600 mt-1">
                           Drink at least 500ml of water and eat a healthy iron-rich meal 2-3 hours before donating blood to ensure steady vitals.
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                     <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <span className="text-xs font-medium text-slate-500">Recovery Interval</span>
                        <p className="text-base font-bold text-slate-900 mt-0.5">90 - 120 Days</p>
                        <span className="text-[11px] text-slate-400">Between whole blood donations</span>
                     </div>

                     <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                        <span className="text-xs font-medium text-slate-500">Compatibility Guide</span>
                        <p className="text-base font-bold text-rose-600 mt-0.5">{bloodGroup} Matches</p>
                        <span className="text-[11px] text-slate-400">High priority requests</span>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                     <Button
                        onClick={() => navigate("/dashboard/donation_request")}
                        variant="outline"
                        className="w-full rounded-xl text-xs font-semibold text-rose-600 border-rose-200 hover:bg-rose-50 cursor-pointer">
                        View Donation Requests
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Recent Activity: Sent & Received Requests */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Sent Requests */}
            <Card className="border-slate-200/80 bg-white shadow-xs">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Send className="h-5 w-5 text-rose-600" />
                        Recent Sent Requests
                     </CardTitle>
                     <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg">
                        <Link to="/dashboard/donation_request">
                           View All
                           <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-4 sm:p-6">
                  {dashboardData?.recentSentRequests?.length > 0 ? (
                     <div className="space-y-3">
                        {dashboardData.recentSentRequests.map((request) => {
                           const badge = getStatusBadge(request.status)
                           return (
                              <div
                                 key={request.id}
                                 className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-rose-200 hover:shadow-xs transition-all bg-white group">
                                 <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-rose-50 text-slate-600 group-hover:text-rose-600 flex items-center justify-center shrink-0 transition-colors">
                                       <Hospital className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                       <p className="font-semibold text-sm text-slate-900 truncate">
                                          {request.hospital || "General Hospital"}
                                       </p>
                                       <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                          <Calendar className="h-3 w-3" />
                                          <span>{formatDate(request.createdAt)}</span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 uppercase">
                                       {request.blood_group}
                                    </span>
                                    <Badge className={`${badge.bg} text-[10px] font-semibold px-2 py-0.5 flex items-center gap-1 border`}>
                                       {badge.icon}
                                       <span className="capitalize">{request.status}</span>
                                    </Badge>
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  ) : (
                     <div className="text-center py-10 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                           <Send className="h-6 w-6" />
                        </div>
                        <div>
                           <p className="text-sm font-semibold text-slate-700">No sent requests recorded</p>
                           <p className="text-xs text-slate-400 mt-0.5">Need blood for a patient or relative?</p>
                        </div>
                        <Button
                           onClick={() => navigate("/dashboard/donation_request")}
                           size="sm"
                           className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold cursor-pointer">
                           <Plus className="w-3.5 h-3.5 mr-1" />
                           Create Request
                        </Button>
                     </div>
                  )}
               </CardContent>
            </Card>

            {/* Recent Received Requests */}
            <Card className="border-slate-200/80 bg-white shadow-xs">
               <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Inbox className="h-5 w-5 text-rose-600" />
                        Recent Received Requests
                     </CardTitle>
                     <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg">
                        <Link to="/dashboard/donation_request">
                           View All
                           <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-4 sm:p-6">
                  {dashboardData?.recentReceivedRequests?.length > 0 ? (
                     <div className="space-y-3">
                        {dashboardData.recentReceivedRequests.map((request) => {
                           const badge = getStatusBadge(request.status)
                           return (
                              <div
                                 key={request.id}
                                 className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-rose-200 hover:shadow-xs transition-all bg-white group">
                                 <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-rose-50 text-slate-600 group-hover:text-rose-600 flex items-center justify-center shrink-0 transition-colors">
                                       <Hospital className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                       <p className="font-semibold text-sm text-slate-900 truncate">
                                          {request.hospital || "Medical Center"}
                                       </p>
                                       <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                          <Calendar className="h-3 w-3" />
                                          <span>{formatDate(request.createdAt)}</span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 uppercase">
                                       {request.blood_group}
                                    </span>
                                    <Badge className={`${badge.bg} text-[10px] font-semibold px-2 py-0.5 flex items-center gap-1 border`}>
                                       {badge.icon}
                                       <span className="capitalize">{request.status}</span>
                                    </Badge>
                                 </div>
                              </div>
                           )
                        })}
                     </div>
                  ) : (
                     <div className="text-center py-10 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                           <Inbox className="h-6 w-6" />
                        </div>
                        <div>
                           <p className="text-sm font-semibold text-slate-700">No incoming donation requests</p>
                           <p className="text-xs text-slate-400 mt-0.5">Your profile is visible when recipients search nearby.</p>
                        </div>
                        <Button
                           onClick={() => navigate("/dashboard/find-donors")}
                           variant="outline"
                           size="sm"
                           className="border-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer">
                           <Search className="w-3.5 h-3.5 mr-1" />
                           Search Other Donors
                        </Button>
                     </div>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* 24/7 Emergency Support Banner */}
         <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4 text-center sm:text-left">
               <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/20">
                  <PhoneCall className="w-6 h-6 animate-bounce" />
               </div>
               <div>
                  <h4 className="text-base font-bold text-slate-900">Need Urgent Emergency Blood Assistance?</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                     Call our 24/7 Rapid Response Hotline for real-time donor matching and medical coordination.
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
               <a
                  href="tel:01540042699"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  01540042699
               </a>
            </div>
         </div>
      </div>
   )
}

export default DashboardOverview

