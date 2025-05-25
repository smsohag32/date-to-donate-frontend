
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, Lock, User, Phone, MapPin, Droplet } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useRegisterUserMutation } from "@/redux-store/services/user-api"
import { toast } from "sonner"


const formSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
   first_name: z.string().min(1, { message: "First name is required" }),
   last_name: z.string().min(1, { message: "Last name is required" }),
   phone: z.string().min(10, { message: "Enter a valid phone number" }),
   blood_group: z.string().min(1, { message: "Blood group is required" }),
   address: z.string().min(1, { message: "Address is required" }),
})

const Register = () => {
   const [registerUser, { isLoading }] = useRegisterUserMutation()
   const navigate = useNavigate()
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
         first_name: "",
         last_name: "",
         phone: "",
         blood_group: "",
         address: "",
      },
   })

   const onSubmit = async (data) => {
      try {
         await registerUser(data).unwrap()
         form.reset()
         toast.success("Registration successful!")
         navigate("/login/login")
      } catch (error) {
         console.error("Registration failed:", error)
      }
   }

   return (
      <div className="min-h-screen py-8 px-0 w-full  md:py-16 bg-gradient-to-b from-[#FF2156] to-[#FF2156] flex items-center justify-center">
         <div className="main-container">
            <Card className="max-w-3xl  w-full  lg:px-8 mx-auto shadow-lg border-0">
               <CardHeader className="space-y-1 text-center pb-6 pt-8">
                  <div className="flex flex-col items-center gap-2">
                     <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-[#FF2156]" />
                     </div>
                     <h2 className="text-2xl font-bold tracking-tight">
                        <span className="text-[#FF2156]">Dare </span>
                        <span className="text-gray-700">To</span>
                        <span className="text-[#FF2156]"> Donate</span>
                     </h2>
                  </div>
                  <p className="text-gray-700 font-semibold text-xl mt-4">Create your account</p>
                  <p className="text-gray-500 text-sm">Enter your information to register</p>
               </CardHeader>

               <CardContent className="px-6 pb-8">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="first_name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-gray-700">First Name</FormLabel>
                                    <div className="relative">
                                       <FormControl>
                                          <Input
                                             className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20"
                                             placeholder="Enter your first name"
                                             {...field}
                                          />
                                       </FormControl>
                                       <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="last_name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-gray-700">Last Name</FormLabel>
                                    <div className="relative">
                                       <FormControl>
                                          <Input
                                             className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20"
                                             placeholder="Enter your last name"
                                             {...field}
                                          />
                                       </FormControl>
                                       <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-gray-700">Email</FormLabel>
                                 <div className="relative">
                                    <FormControl>
                                       <Input
                                          type="email"
                                          className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20"
                                          placeholder="Enter your email address"
                                          {...field}
                                       />
                                    </FormControl>
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-gray-700">Phone Number</FormLabel>
                                    <div className="relative">
                                       <FormControl>
                                          <Input
                                             className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20"
                                             placeholder="Enter your phone number"
                                             {...field}
                                          />
                                       </FormControl>
                                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="blood_group"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-gray-700">Blood Group</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <SelectTrigger className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20 relative">
                                          <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                          <SelectValue placeholder="Select Blood Group" />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
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
                        </div>

                        <FormField
                           control={form.control}
                           name="address"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-gray-700">Address</FormLabel>
                                 <div className="relative">
                                    <FormControl>
                                       <Input
                                          className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20"
                                          placeholder="Enter your full address"
                                          {...field}
                                       />
                                    </FormControl>
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-gray-700">Password</FormLabel>
                                 <div className="relative">
                                    <FormControl>
                                       <Input
                                          type="password"
                                          className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-[#FF2156] focus-visible:ring-[#FF2156]/20"
                                          placeholder="Create a secure password"
                                          {...field}
                                       />
                                    </FormControl>
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FF2156]" />
                                 </div>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <Button
                           type="submit"
                           className="w-full bg-[#FF2156] hover:bg-[#e01e4d] text-white font-medium py-6 rounded-md transition-colors"
                           disabled={isLoading}
                        >
                           {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                     </form>
                  </Form>

                  <div className="mt-6 text-center text-gray-600">
                     Already have an account?{" "}
                     <Link to="/auth/login" className="text-[#FF2156] font-medium hover:underline transition-colors">
                        Sign in
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}

export default Register
