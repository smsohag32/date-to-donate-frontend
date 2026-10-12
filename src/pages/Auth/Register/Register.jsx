import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, Lock, User, Phone, MapPin, Droplet, Heart, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useRegisterUserMutation } from "@/redux-store/services/user-api"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

const formSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
   first_name: z.string().min(1, { message: "First name is required" }),
   last_name: z.string().min(1, { message: "Last name is required" }),
   phone: z.string().min(10, { message: "Enter a valid phone number" }),
   blood_group: z.string().min(1, { message: "Blood group is required" }),
   address: z.string().min(1, { message: "Address / Area is required" }),
})

const Register = () => {
   const [showPassword, setShowPassword] = useState(false)
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
         toast.success("Account created successfully! Please sign in.")
         navigate("/auth/login")
      } catch (error) {
         console.error("Registration failed:", error)
         const errorMessage = error?.data?.message || error?.message || "Registration failed. Please try again."
         toast.error(errorMessage)
      }
   }

   return (
      <div className="min-h-[92vh] py-12 px-4 flex items-center justify-center bg-gradient-to-b from-rose-50/50 via-white to-slate-50/50 relative overflow-hidden">
         {/* Atmospheric subtle glow */}
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />

         <div className="w-full max-w-2xl relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <Card className="bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl shadow-rose-900/10 rounded-[2.5rem] p-8 sm:p-12">
                  {/* Brand Header */}
                  <div className="text-center space-y-3 mb-8">
                     <NavLink to="/" className="inline-flex items-center gap-2.5 mx-auto">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-200">
                           <Heart className="w-6 h-6 fill-white" />
                        </div>
                     </NavLink>

                     <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                           Join the Lifesaver Network
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">
                           Register as a voluntary donor and be ready to save lives
                        </p>
                     </div>
                  </div>

                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="first_name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       First Name *
                                    </FormLabel>
                                    <div className="relative">
                                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                       <FormControl>
                                          <Input
                                             placeholder="e.g. Tanvir"
                                             className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                             {...field}
                                          />
                                       </FormControl>
                                    </div>
                                    <FormMessage className="text-xs text-rose-500" />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="last_name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       Last Name *
                                    </FormLabel>
                                    <div className="relative">
                                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                       <FormControl>
                                          <Input
                                             placeholder="e.g. Ahmed"
                                             className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                             {...field}
                                          />
                                       </FormControl>
                                    </div>
                                    <FormMessage className="text-xs text-rose-500" />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       Email Address *
                                    </FormLabel>
                                    <div className="relative">
                                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                       <FormControl>
                                          <Input
                                             type="email"
                                             placeholder="tanvir@example.com"
                                             className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                             {...field}
                                          />
                                       </FormControl>
                                    </div>
                                    <FormMessage className="text-xs text-rose-500" />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       Contact Phone Number *
                                    </FormLabel>
                                    <div className="relative">
                                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                       <FormControl>
                                          <Input
                                             placeholder="+880 1XXXXXXXXX"
                                             className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                             {...field}
                                          />
                                       </FormControl>
                                    </div>
                                    <FormMessage className="text-xs text-rose-500" />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="blood_group"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       Blood Group *
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold text-slate-800">
                                             <div className="flex items-center gap-2">
                                                <Droplet className="w-4 h-4 text-rose-600 fill-rose-600" />
                                                <SelectValue placeholder="Select Blood Group" />
                                             </div>
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="rounded-xl">
                                          {bloodGroups.map((group) => (
                                             <SelectItem key={group} value={group} className="font-bold">
                                                {group} Group
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs text-rose-500" />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       City / Area Address *
                                    </FormLabel>
                                    <div className="relative">
                                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                       <FormControl>
                                          <Input
                                             placeholder="e.g. Dhanmondi, Dhaka"
                                             className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                             {...field}
                                          />
                                       </FormControl>
                                    </div>
                                    <FormMessage className="text-xs text-rose-500" />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Create Password *
                                 </FormLabel>
                                 <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <FormControl>
                                       <Input
                                          type={showPassword ? "text" : "password"}
                                          placeholder="At least 6 characters"
                                          className="h-12 pl-11 pr-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                          {...field}
                                       />
                                    </FormControl>
                                    <button
                                       type="button"
                                       onClick={() => setShowPassword(!showPassword)}
                                       className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                       aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                 </div>
                                 <FormMessage className="text-xs text-rose-500" />
                              </FormItem>
                           )}
                        />

                        {/* Voluntary Pledge Note */}
                        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-2.5 text-xs text-rose-900/80">
                           <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                           <span>
                              By registering, you confirm that your blood donations will be voluntary and unpaid, in accordance with humanitarian healthcare standards.
                           </span>
                        </div>

                        <Button
                           type="submit"
                           disabled={isLoading}
                           className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all text-base"
                        >
                           {isLoading ? "Creating Account..." : "Complete Registration"}
                           <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                     </form>
                  </Form>

                  <div className="mt-8 text-center text-xs text-slate-500">
                     Already registered as a donor?{" "}
                     <Link to="/auth/login" className="text-rose-600 font-bold hover:underline">
                        Sign In Here
                     </Link>
                  </div>
               </Card>
            </motion.div>
         </div>
      </div>
   )
}

export default Register
