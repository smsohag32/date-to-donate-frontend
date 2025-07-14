"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Loader2, Upload, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const formSchema = z.object({
   first_name: z.string().min(2, "First name must be at least 2 characters"),
   blood_group: z.string().min(1, "Please select a blood group"),

   // Optional fields
   last_name: z.string().optional(),
   phone: z.string().optional(),
   address: z.string().optional(),
   last_donation_date: z.date().optional(),
   profile_image: z.any().optional(),
});


export default function EditProfileForm({ profile, onSubmit, onCancel }) {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [previewImage, setPreviewImage] = useState(profile?.profile_image || null)
   const [file, setFile] = useState(null)
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         first_name: profile?.first_name || "",
         last_name: profile?.last_name || "",
         blood_group: profile?.blood_group || "",
         phone: profile?.phone || "",
         address: profile?.address || "",
         last_donation_date: profile?.last_donation_date ? new Date(profile.last_donation_date) : undefined,
         profile_image: profile.profile_image || undefined,
      },
   })

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         const reader = new FileReader()
         reader.onloadend = () => {
            setPreviewImage(reader.result)
         }
         setFile(file)
         reader.readAsDataURL(file)
         form.setValue("profile_image", file)
      }
   }

   const handleSubmit = async (values) => {
      setIsSubmitting(true)
      try {
         // Build object with only changed fields
         const changedValues = Object.entries(values).reduce((acc, [key, value]) => {
            const originalValue = profile?.[key];

            // Special case: handle Date comparison
            if (key === "last_donation_date") {
               const originalDate = originalValue ? new Date(originalValue).toISOString() : null;
               const newDate = value ? new Date(value).toISOString() : null;
               if (originalDate !== newDate) {
                  acc[key] = value;
               }
            }



            // Default case: check if value is different
            else if (value !== originalValue) {
               acc[key] = value;
            }

            return acc;
         }, {});
         if (file) {
            changedValues.file = file;
         }
         await onSubmit(changedValues);
      } catch (error) {
         console.error("Error updating profile:", error);
      } finally {
         setIsSubmitting(false);
      }
   };


   const getInitials = (firstName, lastName) => {
      return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
   }

   return (
      <Card className="w-full max-w-3xl mb-8 mx-auto shadow-lg border-0 overflow-hidden">
         <div className="bg-gradient-to-r from-rose-500 to-rose-600 h-16"></div>
         <CardHeader className="relative pb-0">
            <div className="absolute -top-12 left-6 ring-4 ring-white rounded-full">
               <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                  <AvatarImage src={previewImage || "/placeholder.svg?height=128&width=128"} alt="Profile" />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600">
                     {getInitials(form.watch("first_name"), form.watch("last_name"))}
                  </AvatarFallback>
               </Avatar>
            </div>
            <div className="ml-32">
               <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
               <CardDescription className="text-base">Update your personal information and donor details</CardDescription>
            </div>
         </CardHeader>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
               <CardContent className="space-y-8 pt-8">
                  {/* Profile Image Upload */}
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg">
                     <div className="flex-shrink-0">
                        <Avatar className="w-16 h-16 border-2 border-white shadow">
                           <AvatarImage src={previewImage || "/placeholder.svg?height=128&width=128"} alt="Profile" />
                           <AvatarFallback className="bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600">
                              <User className="h-8 w-8" />
                           </AvatarFallback>
                        </Avatar>
                     </div>
                     <div className="flex-grow">
                        <h3 className="font-medium text-slate-900 mb-1">Profile Photo</h3>
                        <p className="text-sm text-slate-500 mb-2">Upload a professional photo for your donor profile</p>
                        <FormItem className="m-0">
                           <FormLabel
                              htmlFor="profileImage"
                              className="inline-flex max-w-[180px] items-center gap-2 cursor-pointer bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-md px-4 py-2.5 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                           >
                              <Upload className="h-4 w-4" />
                              Upload Photo
                           </FormLabel>
                           <Input
                              id="profileImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                           />
                           <FormDescription className="text-xs mt-1">JPG, PNG, or GIF (max 5MB)</FormDescription>
                        </FormItem>

                     </div>
                  </div>

                  <Separator />

                  <div>
                     <h3 className="font-medium text-slate-900 mb-4">Personal Information</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <FormField
                           control={form.control}
                           name="first_name"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>First Name</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Enter your first name" {...field} className="border-slate-300" />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        {/* Last Name */}
                        <FormField
                           control={form.control}
                           name="last_name"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Last Name</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Enter your last name" {...field} className="border-slate-300" />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        {/* Blood Group */}
                        <FormField
                           control={form.control}
                           name="blood_group"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Blood Group</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                       <SelectTrigger className="border-slate-300">
                                          <SelectValue placeholder="Select your blood group" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {bloodGroups.map((group) => (
                                          <SelectItem key={group} value={group}>
                                             {group}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        {/* Phone Number */}
                        <FormField
                           control={form.control}
                           name="phone"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Phone Number</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} className="border-slate-300" />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>

                  <Separator />

                  <div>
                     <h3 className="font-medium text-slate-900 mb-4">Donor Information</h3>
                     <div className="grid grid-cols-1 gap-6">
                        {/* Last Donation Date */}
                        <FormField
                           control={form.control}
                           name="last_donation_date"
                           render={({ field }) => (
                              <FormItem className="flex flex-col">
                                 <FormLabel>Last Donation Date</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button
                                             variant={"outline"}
                                             className={cn(
                                                "w-full pl-3 text-left font-normal border-slate-300",
                                                !field.value && "text-muted-foreground",
                                             )}
                                          >
                                             {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                       </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                       <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) => date > new Date()}
                                          initialFocus
                                       />
                                    </PopoverContent>
                                 </Popover>
                                 <FormDescription>When did you last donate blood?</FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        {/* Address */}
                        <FormField
                           control={form.control}
                           name="address"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Address</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Enter your full address"
                                       className="resize-none border-slate-300"
                                       rows={3}
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
               </CardContent>
               <CardFooter className="flex justify-end gap-3 border-t p-6 mt-6 bg-slate-50">
                  <Button type="button" variant="outline" onClick={onCancel} className="border-slate-300">
                     Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-rose-600 hover:bg-rose-700 text-white px-6">
                     {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     Save Changes
                  </Button>
               </CardFooter>
            </form>
         </Form>
      </Card>
   )
}
