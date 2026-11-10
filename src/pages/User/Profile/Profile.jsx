import { useState } from "react"
import useAuth from "@/hooks/useAuth"
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/redux-store/services/user-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
   CalendarIcon,
   DropletIcon,
   PhoneIcon,
   MailIcon,
   EditIcon,
   ClockIcon,
   ShieldCheck,
   MapPin,
   UserCheck,
   Heart,
   Sparkles,
   CheckCircle2,
   AlertCircle,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Loading from "@/components/skeleton/Loading"
import EditProfileForm from "./EditProfile"
import { toast } from "sonner"
import { CookieManager } from "@/utils/helpers"

const Profile = () => {
   const { user } = useAuth()
   const { data: userDetails, isLoading } = useGetUserByIdQuery({ id: user?.id })
   const [showEditForm, setShowEditForm] = useState(false)
   const navigate = useNavigate()
   const [updateUser] = useUpdateUserMutation()

   const formatDate = (dateString) => {
      if (!dateString) return "No record"
      return new Date(dateString).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      })
   }

   const getInitials = (firstName, lastName) => {
      return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
   }

   if (isLoading) {
      return <Loading />
   }

   if (!userDetails || !userDetails.data) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4 text-rose-600">
               <DropletIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Profile Not Found</h2>
            <p className="text-slate-500 mb-6 max-w-sm">We couldn&apos;t retrieve your profile information.</p>
            <Button onClick={() => navigate("/dashboard")} className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl">
               Back to Dashboard
            </Button>
         </div>
      )
   }

   const { profile, user: userData } = userDetails.data

   const handleProfileUpdate = async (modifiedUser) => {
      try {
         const { file, ...userInfo } = modifiedUser

         const formData = new FormData()

         if (file) {
            formData.append("image", file)
         }
         formData.append("content", JSON.stringify(userInfo))
         const response = await updateUser({ id: userData.id, formData }).unwrap()
         if (response?.httpStatusCode === 200) {
            if (response?.data) {
               CookieManager.setCookie("user_info", JSON.stringify(response.data))
            }

            toast.info("Profile updated successfully")
            setShowEditForm(false)
         } else {
            toast.error(response?.message || "Failed to update profile")
         }
      } catch (error) {
         console.error("Profile update failed:", error)
         toast.error("Something went wrong while updating profile")
      }
   }

   return (
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
         {showEditForm ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8">
               <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                  <div>
                     <h2 className="text-xl font-black text-slate-900">Edit Your Profile</h2>
                     <p className="text-xs text-slate-500 mt-0.5">Keep your contact and donation availability updated</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowEditForm(false)} className="rounded-xl font-bold">
                     Cancel
                  </Button>
               </div>
               <EditProfileForm profile={profile} onSubmit={handleProfileUpdate} onCancel={() => setShowEditForm(false)} />
            </div>
         ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
               {/* Left Column: Summary Card */}
               <div className="lg:col-span-4">
                  <Card className="rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 bg-white overflow-hidden">
                     {/* Decorative Header Gradient */}
                     <div className="h-24 bg-gradient-to-r from-rose-600 via-red-500 to-rose-700 relative">
                        <div className="absolute top-3 right-3">
                           <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                              My Account
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
                           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <PhoneIcon className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 truncate">{profile.phone || "No phone added"}</span>
                           </div>

                           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <MailIcon className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 truncate">{userData.email}</span>
                           </div>

                           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <CalendarIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                 <p className="text-[10px] uppercase font-bold text-slate-400">Last Donation</p>
                                 <p className="text-xs font-bold text-slate-800 truncate">{formatDate(profile.last_donation_date)}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <ClockIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                 <p className="text-[10px] uppercase font-bold text-slate-400">Joined Platform</p>
                                 <p className="text-xs font-bold text-slate-800 truncate">{formatDate(userData.createdAt)}</p>
                              </div>
                           </div>
                        </div>

                        <Button
                           className="w-full mt-6 h-12 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-all cursor-pointer"
                           onClick={() => setShowEditForm(true)}
                        >
                           <EditIcon className="w-4 h-4 mr-2" />
                           Edit Profile Details
                        </Button>
                     </div>
                  </Card>
               </div>

               {/* Right Column: Detailed Categorized Profile Cards */}
               <div className="lg:col-span-8 space-y-6">
                  {/* Personal Information */}
                  <Card className="rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 bg-white">
                     <CardHeader className="pb-3 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
                              <UserCheck className="w-5 h-5 text-rose-600" />
                              Personal & Contact Information
                           </CardTitle>
                           <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                              Blood Group: {profile.blood_group}
                           </span>
                        </div>
                     </CardHeader>
                     <CardContent className="pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                              <p className="text-sm font-bold text-slate-900 mt-1">
                                 {profile.first_name} {profile.last_name}
                              </p>
                           </div>

                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Group</p>
                              <p className="text-sm font-black text-rose-600 mt-1">{profile.blood_group}</p>
                           </div>

                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                              <p className="text-sm font-bold text-slate-900 mt-1">{profile.phone || "Not specified"}</p>
                           </div>

                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                              <p className="text-sm font-bold text-slate-900 mt-1 truncate">{userData.email}</p>
                           </div>

                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 sm:col-span-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location / Address</p>
                              <p className="text-sm font-semibold text-slate-800 mt-1">{profile?.address || "No address provided"}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Donation Status & Readiness */}
                  <Card className="rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 bg-white">
                     <CardHeader className="pb-3 border-b border-slate-100">
                        <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
                           <Heart className="w-5 h-5 text-rose-600 fill-rose-100" />
                           Donor Readiness & Impact
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Availability</p>
                              <div className="mt-2">
                                 {profile.available_donate ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                       Available to Donate Now
                                    </span>
                                 ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-bold text-xs">
                                       <ClockIcon className="w-3.5 h-3.5 text-slate-500" />
                                       Currently Unavailable
                                    </span>
                                 )}
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Recorded Donation</p>
                              <p className="text-sm font-bold text-slate-900 mt-2">{formatDate(profile.last_donation_date)}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Account Security & Verification */}
                  <Card className="rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 bg-white">
                     <CardHeader className="pb-3 border-b border-slate-100">
                        <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
                           <ShieldCheck className="w-5 h-5 text-rose-600" />
                           Account Status & Verification
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account State</p>
                              <div className="mt-1.5">
                                 {userData.is_active ? (
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                       <CheckCircle2 className="w-3.5 h-3.5" /> Active
                                    </span>
                                 ) : (
                                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                                       <AlertCircle className="w-3.5 h-3.5" /> Inactive
                                    </span>
                                 )}
                              </div>
                           </div>

                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identity Verification</p>
                              <div className="mt-1.5">
                                 {userData.is_verified ? (
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                       <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                                    </span>
                                 ) : (
                                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                                       <ClockIcon className="w-3.5 h-3.5" /> Pending Verification
                                    </span>
                                 )}
                              </div>
                           </div>

                           <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Member Since</p>
                              <p className="text-xs font-bold text-slate-800 mt-2">{formatDate(userData.createdAt)}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         )}
      </div>
   )
}

export default Profile
