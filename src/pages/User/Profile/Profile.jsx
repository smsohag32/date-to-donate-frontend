"use client"

import { useState } from "react"

import useAuth from "@/hooks/useAuth"
import { useGetUserByIdQuery } from "@/redux-store/services/user-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, DropletIcon, PhoneIcon, MailIcon, EditIcon, UserIcon, ClockIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Profile = () => {
   const { user } = useAuth()
   const { data: userDetails, isLoading } = useGetUserByIdQuery({ id: user?._id })
   const [activeTab, setActiveTab] = useState("overview")
   const navigate = useNavigate()
   // Format date to readable format
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
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-t-rose-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
         </div>
      )
   }

   if (!userDetails || !userDetails.data) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
            <p className="text-gray-500 mb-6">We couldn&apos;t find your profile information.</p>
            <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
         </div>
      )
   }

   const { profile, user: userData } = userDetails.data

   return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
               <CardHeader className="text-center">
                  <div className="flex flex-col items-center">
                     <Avatar className="w-32 h-32 mb-4">
                        <AvatarImage
                           src={profile.profile_image || "/placeholder.svg?height=128&width=128"}
                           alt={`${profile.first_name} ${profile.last_name}`}
                        />
                        <AvatarFallback className="text-3xl bg-rose-100 text-rose-600">
                           {getInitials(profile.first_name, profile.last_name)}
                        </AvatarFallback>
                     </Avatar>
                     <Badge className="mb-2 bg-rose-600 hover:bg-rose-700">
                        <DropletIcon className="w-4 h-4 mr-1" />
                        {profile.blood_group}
                     </Badge>
                     <CardTitle className="text-2xl">
                        {profile.first_name} {profile.last_name}
                     </CardTitle>
                     <CardDescription>
                        {profile.available_donate ? (
                           <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                              Available to Donate
                           </Badge>
                        ) : (
                           <Badge variant="outline" className="mt-2 text-gray-600 border-gray-600">
                              Currently Unavailable
                           </Badge>
                        )}
                     </CardDescription>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="flex items-center">
                        <PhoneIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>{profile.phone}</span>
                     </div>
                     <div className="flex items-center">
                        <MailIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>{userData.email}</span>
                     </div>
                     <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>Last Donation: {formatDate(profile.last_donation_date)}</span>
                     </div>
                     <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 mr-3 text-gray-500" />
                        <span>Member Since: {formatDate(userData.createdAt)}</span>
                     </div>
                     <Button className="w-full mt-4" variant="outline">
                        <EditIcon className="w-4 h-4 mr-2" />
                        Edit Profile
                     </Button>
                  </div>
               </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-2">
               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-rose-100">
                     <TabsTrigger value="overview" className="data-[state=active]:bg-rose-400 data-[state=active]:text-white">
                        Overview
                     </TabsTrigger>
                     <TabsTrigger
                        value="donation-history"
                        className="data-[state=active]:bg-rose-400 data-[state=active]:text-white"
                     >
                        Donation History
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                     <Card>
                        <CardHeader>
                           <CardTitle>Donor Profile</CardTitle>
                           <CardDescription>Your personal information and donation status</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-6">
                              <div>
                                 <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Full Name</p>
                                       <p>
                                          {profile.first_name} {profile.last_name}
                                       </p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Blood Group</p>
                                       <p className="font-semibold text-rose-600">{profile.blood_group}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Phone Number</p>
                                       <p>{profile.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Email</p>
                                       <p>{userData.email}</p>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <h3 className="text-lg font-medium mb-3">Donation Status</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Availability</p>
                                       <p>
                                          {profile.available_donate ? (
                                             <span className="text-green-600 font-medium">Available to Donate</span>
                                          ) : (
                                             <span className="text-gray-600">Currently Unavailable</span>
                                          )}
                                       </p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Last Donation</p>
                                       <p>{formatDate(profile.last_donation_date)}</p>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <h3 className="text-lg font-medium mb-3">Account Information</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Account Status</p>
                                       <p>
                                          {userData.is_active ? (
                                             <span className="text-green-600 font-medium">Active</span>
                                          ) : (
                                             <span className="text-rose-600">Inactive</span>
                                          )}
                                       </p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Verification Status</p>
                                       <p>
                                          {userData.is_verified ? (
                                             <span className="text-green-600 font-medium">Verified</span>
                                          ) : (
                                             <span className="text-amber-600">Not Verified</span>
                                          )}
                                       </p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm text-gray-500">Member Since</p>
                                       <p>{formatDate(userData.createdAt)}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="donation-history" className="mt-6">
                     <Card>
                        <CardHeader>
                           <CardTitle>Donation History</CardTitle>
                           <CardDescription>Your blood donation records and history</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {profile.last_donation_date ? (
                              <div className="space-y-4">
                                 <div className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                       <div>
                                          <h4 className="font-medium">Blood Donation</h4>
                                          <p className="text-sm text-gray-500">{formatDate(profile.last_donation_date)}</p>
                                       </div>
                                       <Badge className="bg-rose-600 hover:bg-rose-700">{profile.blood_group}</Badge>
                                    </div>
                                 </div>

                                 {/* This is a placeholder for future donation records */}
                                 <p className="text-center text-gray-500 py-4">Previous donation records will appear here</p>
                              </div>
                           ) : (
                              <div className="text-center py-12">
                                 <UserIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                 <h3 className="text-lg font-medium mb-2">No Donation Records</h3>
                                 <p className="text-gray-500 mb-6">You haven&apos;t recorded any blood donations yet.</p>
                                 <Button>Record Your First Donation</Button>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </div>
   )
}

export default Profile
