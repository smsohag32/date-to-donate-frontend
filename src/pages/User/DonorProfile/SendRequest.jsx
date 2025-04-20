

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AlertCircle, Clock, Hospital, MapPin, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import useAuth from "@/hooks/useAuth"
import { useRequestSendMutation } from "@/redux-store/services/request-api"
import { toast } from "sonner"

const SendRequest = ({ donor }) => {
   console.log("donor", donor)
   const { user } = useAuth()
   const [open, setOpen] = useState(false)
   const [requestSend, { isLoading }] = useRequestSendMutation()


   const form = useForm({
      defaultValues: {
         hospital: "",
         address: "",
         note: "Urgent requirement for blood donation",
      },
      mode: "onChange",
   })


   const { handleSubmit, formState } = form
   const { isValid } = formState

   const onSubmit = async (data) => {
      const payload = {
         request_maker: user?._id,
         donor_id: donor?.user?._id,
         hospital: data.hospital,
         address: data.address,
         note: data.note,
      }

      try {
         await requestSend(payload).unwrap()
         setOpen(false)
         toast.info("Request sent!")
         form.reset()

      } catch (err) {
         console.error("Failed to send request:", err)

      }
   }


   const getInitials = (name) => {
      if (!name) return "BD"
      return name
         .split(" ")
         .map((n) => n[0])
         .join("")
         .toUpperCase()
         .substring(0, 2)
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <div>
               <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium transition-all flex items-center gap-2"

               >
                  <Send className="w-5 h-5" />
                  Send Request
               </Button>
            </div>
         </DialogTrigger>

         <DialogContent className="sm:max-w-[500px]  p-0  rounded-lg">
            <div className="bg-gradient-to-r from-red-600 rounded-lg to-red-500 p-6 text-white">
               <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Blood Donation Request</DialogTitle>
                  <DialogDescription className="text-red-100 mt-1">
                     Send a request to this donor for urgent blood donation
                  </DialogDescription>
               </DialogHeader>
            </div>

            <Form  {...form}>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  ">
                  <div className="w-full p-5 space-y-5  max-h-[60vh] overflow-y-auto "> <Card className="border border-red-100 bg-red-50">
                     <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-red-200">
                           <AvatarImage src={donor?.profile?.profile_image || "/placeholder.svg?height=64&width=64"} alt={donor?.profile?.first_name} />
                           <AvatarFallback className="bg-red-100 text-red-600 text-lg font-semibold">
                              {getInitials(donor?.profile?.first_name)}
                           </AvatarFallback>
                        </Avatar>

                        <div className="space-y-1 flex-1">
                           <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{donor?.profile?.first_name || ""}</h3>
                              <Badge className="bg-red-600">{donor?.profile?.blood_group || ""}</Badge>
                           </div>
                           <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" /> {donor?.profile?.address || ""}
                           </p>
                           <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> Last donated: 3 months ago
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                     <div className="space-y-4">
                        <FormField
                           control={form.control}
                           name="hospital"
                           rules={{
                              required: "Hospital name is required",
                              minLength: {
                                 value: 3,
                                 message: "Hospital name must be at least 3 characters",
                              },
                           }}
                           render={({ field }) => (
                              <FormItem className="space-y-2">
                                 <FormLabel className="flex items-center gap-1.5">
                                    <Hospital className="h-4 w-4 text-red-600" /> Hospital Name
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       placeholder="Enter hospital name"
                                       className="border-red-100 focus-visible:ring-red-500"
                                    />
                                 </FormControl>
                                 <FormMessage className="text-red-500 text-xs" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="address"
                           rules={{
                              required: "Address is required",
                              minLength: {
                                 value: 5,
                                 message: "Address must be at least 5 characters",
                              },
                           }}
                           render={({ field }) => (
                              <FormItem className="space-y-2">
                                 <FormLabel className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-red-600" /> Address
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       placeholder="Enter address"
                                       className="border-red-100 focus-visible:ring-red-500"
                                    />
                                 </FormControl>
                                 <FormMessage className="text-red-500 text-xs" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="note"
                           rules={{
                              required: "Note is required",
                              minLength: {
                                 value: 10,
                                 message: "Please provide more details (at least 10 characters)",
                              },
                           }}
                           render={({ field }) => (
                              <FormItem className="space-y-2">
                                 <FormLabel className="flex items-center gap-1.5">
                                    <MessageSquare className="h-4 w-4 text-red-600" /> Additional Notes
                                 </FormLabel>
                                 <FormControl>
                                    <Textarea
                                       {...field}
                                       placeholder="Write additional details..."
                                       className="min-h-[100px] border-red-100 focus-visible:ring-red-500"
                                    />
                                 </FormControl>
                                 <FormMessage className="text-red-500 text-xs" />
                              </FormItem>
                           )}
                        />
                     </div>

                     <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                           Please ensure all details are accurate. The donor will receive your request immediately.
                        </p>
                     </div>
                  </div>

                  <DialogFooter className="pt-2 px-5 pb-5 flex flex-col sm:flex-row gap-3 ">
                     <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                     >
                        Cancel
                     </Button>
                     <Button
                        type="submit"
                        disabled={isLoading || !isValid}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium"
                        size="lg"
                     >
                        {isLoading ? (
                           <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              Sending Request...
                           </span>
                        ) : (
                           <span className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send Request
                           </span>
                        )}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}

export default SendRequest
