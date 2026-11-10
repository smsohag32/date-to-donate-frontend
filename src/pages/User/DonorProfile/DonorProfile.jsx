import { useGetUserByIdQuery } from "@/redux-store/services/user-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
   CalendarIcon,
   DropletIcon,
   PhoneIcon,
   MailIcon,
   ClockIcon,
   Phone,
   ArrowLeft,
   ShieldCheck,
   MapPin,
   Copy,
   CheckCircle2,
   Sparkles,
   Heart,
   Award,
} from "lucide-react"
import { useNavigate, useParams, Link } from "react-router-dom"
import Loading from "@/components/skeleton/Loading"
import SendRequest from "./SendRequest"
import { toast } from "sonner"

const compatibilityMap = {
   "A+": { canGive: ["A+", "AB+"], canReceive: ["A+", "A-", "O+", "O-"] },
   "O+": { canGive: ["O+", "A+", "B+", "AB+"], canReceive: ["O+", "O-"] },
   "B+": { canGive: ["B+", "AB+"], canReceive: ["B+", "B-", "O+", "O-"] },
   "AB+": { canGive: ["AB+"], canReceive: ["All Blood Groups"] },
   "A-": { canGive: ["A+", "A-", "AB+", "AB-"], canReceive: ["A-", "O-"] },
   "O-": { canGive: ["Universal Donor (All)"], canReceive: ["O-"] },
   "B-": { canGive: ["B+", "B-", "AB+", "AB-"], canReceive: ["B-", "O-"] },
   "AB-": { canGive: ["AB+", "AB-"], canReceive: ["AB-", "A-", "B-", "O-"] },
}

const DonorProfile = () => {
   const { donorId } = useParams()
   const navigate = useNavigate()

   const { data: userDetails, isLoading } = useGetUserByIdQuery({ id: donorId })

   const formatDate = (dateString) => {
      if (!dateString) return "No record available"
      return new Date(dateString).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      })
   }

   const getInitials = (firstName, lastName) => {
      return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
   }

   const copyToClipboard = (text, label) => {
      if (!text) return
      navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard!`)
   }

   if (isLoading) {
      return <Loading />
   }

   if (!userDetails || !userDetails.data) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4 text-rose-600">
               <DropletIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Donor Profile Not Found</h2>
            <p className="text-slate-500 mb-6 max-w-sm">We couldn&apos;t retrieve the requested donor information.</p>
            <Button onClick={() => navigate("/find-donor")} className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Donor Directory
            </Button>
         </div>
      )
   }

   const { profile, user: userData } = userDetails.data
   const compat = compatibilityMap[profile?.blood_group] || {
      canGive: ["Compatible recipients"],
      canReceive: ["Compatible donors"],
   }

   return (
      <div className="min-h-screen bg-slate-50/50 py-8">
         <div className="main-container px-4 sm:px-6 space-y-6">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between">
               <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs"
               >
                  <ArrowLeft className="w-4 h-4" />
                  Back
               </button>

               <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold">
                     <ShieldCheck className="w-3.5 h-3.5" />
                     {userData.is_verified ? "Verified Lifesaver" : "Registered Donor"}
                  </span>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
               {/* Left Column: Quick Profile Card */}
               <div className="lg:col-span-4">
                  <Card className="rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 bg-white overflow-hidden sticky top-6">
                     {/* Decorative Top Accent Banner */}
                     <div className="h-24 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 relative">
                        <div className="absolute top-3 right-3">
                           <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                              ID #{userData.id?.slice(-6) || "DONOR"}
                           </span>
                        </div>
                     </div>

                     <div className="px-6 pb-6 text-center -mt-12">
                        <div className="relative inline-block mx-auto mb-3">
                           <Avatar className="w-24 h-24 border-4 border-white shadow-xl bg-white">
                              <AvatarImage
                                 src={profile.profile_image || "/placeholder.svg?height=128&width=128"}
                                 alt={`${profile.first_name} ${profile.last_name}`}
                                 className="object-cover"
                              />
                              <AvatarFallback className="text-2xl font-black bg-rose-50 text-rose-600">
                                 {getInitials(profile.first_name, profile.last_name)}
                              </AvatarFallback>
                           </Avatar>

                           <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-md">
                              {profile.blood_group}
                           </div>
                        </div>

                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                           {profile.first_name} {profile.last_name}
                        </h2>

                        <div className="mt-2 flex items-center justify-center gap-2">
                           {profile.available_donate ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                 Available to Donate
                              </span>
                           ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold">
                                 Currently Ineligible / Resting
                              </span>
                           )}
                        </div>

                        {/* Quick Contact & Details */}
                        <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-left">
                           {profile.phone && (
                              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                       <PhoneIcon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{profile.phone}</span>
                                 </div>
                                 <button
                                    type="button"
                                    onClick={() => copyToClipboard(profile.phone, "Phone")}
                                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                                    title="Copy Phone"
                                 >
                                    <Copy className="w-3.5 h-3.5" />
                                 </button>
                              </div>
                           )}

                           {userData.email && (
                              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                 <div className="flex items-center gap-3 truncate mr-2">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                       <MailIcon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 truncate">{userData.email}</span>
                                 </div>
                                 <button
                                    type="button"
                                    onClick={() => copyToClipboard(userData.email, "Email")}
                                    className="text-slate-400 hover:text-slate-700 p-1 shrink-0 cursor-pointer"
                                    title="Copy Email"
                                 >
                                    <Copy className="w-3.5 h-3.5" />
                                 </button>
                              </div>
                           )}

                           {profile?.address && (
                              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                 <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
                                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{profile.address}</p>
                                 </div>
                              </div>
                           )}
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2.5 mt-6">
                           <a href={`tel:${profile?.phone}`} className="w-full">
                              <Button
                                 variant="outline"
                                 className="w-full h-11 border-slate-200 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
                              >
                                 <Phone className="w-3.5 h-3.5 mr-1.5 text-rose-600" />
                                 Call Now
                              </Button>
                           </a>

                           <SendRequest donor={userDetails?.data} />
                        </div>
                     </div>
                  </Card>
               </div>

               {/* Right Column: Detailed Sections & Compatibility */}
               <div className="lg:col-span-8 space-y-6">
                  {/* Blood Compatibility Guide Card */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-xl shadow-rose-200">
                     <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-rose-200" />
                        <h3 className="text-base font-black tracking-tight">Blood Compatibility Overview</h3>
                     </div>

                     <p className="text-xs text-rose-100 leading-relaxed max-w-xl mb-4">
                        Understanding compatibility ensures safe transfusions. Here is how group <strong>{profile.blood_group}</strong> interacts with other recipients and donors.
                     </p>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                           <p className="text-[11px] font-bold uppercase tracking-wider text-rose-200">Can Donate Blood To</p>
                           <div className="flex flex-wrap gap-1.5 mt-2">
                              {compat.canGive.map((bg, idx) => (
                                 <span key={idx} className="px-2.5 py-1 rounded-xl bg-white text-rose-700 text-xs font-black shadow-xs">
                                    {bg}
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                           <p className="text-[11px] font-bold uppercase tracking-wider text-rose-200">Can Receive Blood From</p>
                           <div className="flex flex-wrap gap-1.5 mt-2">
                              {compat.canReceive.map((bg, idx) => (
                                 <span key={idx} className="px-2.5 py-1 rounded-xl bg-white text-rose-700 text-xs font-black shadow-xs">
                                    {bg}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Donor History & Status Info */}
                  <Card className="rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 bg-white">
                     <CardHeader className="pb-3 border-b border-slate-100">
                        <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
                           <Heart className="w-5 h-5 text-rose-600 fill-rose-100" />
                           Donation Records & Health Metrics
                        </CardTitle>
                     </CardHeader>

                     <CardContent className="pt-5 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blood Group</p>
                              <p className="text-2xl font-black text-rose-600 mt-1">{profile.blood_group}</p>
                           </div>

                           <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Donation Date</p>
                              <p className="text-sm font-bold text-slate-800 mt-2">
                                 {formatDate(profile.last_donation_date)}
                              </p>
                           </div>

                           <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Member</p>
                              <p className="text-sm font-bold text-slate-800 mt-2">
                                 {formatDate(userData.createdAt)}
                              </p>
                           </div>
                        </div>

                        {/* Account & Trust Verification */}
                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                           <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verification Badges</h4>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                 <span className="font-semibold text-slate-700">Account Verified & Active</span>
                              </div>
                              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80">
                                 <Award className="w-4 h-4 text-rose-600 shrink-0" />
                                 <span className="font-semibold text-slate-700">Committed Voluntary Lifesaver</span>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DonorProfile
