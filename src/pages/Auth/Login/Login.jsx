import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, Lock, Droplet, ArrowRight, ShieldCheck, Heart, Sparkles, Eye, EyeOff } from "lucide-react"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "@/redux-store/slices/auth-slice"
import { toast } from "sonner"
import GoogleLogin from "./GoogleLogin"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const formSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
   password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const Login = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const from = location.state?.from?.pathname || "/dashboard"

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   const onSubmit = async (data) => {
      const { email, password } = data
      setIsLoading(true)
      try {
         const isSocial = false
         const credentials = { email, password }
         await dispatch(loginUser({ credentials, isSocial })).unwrap()
         toast.success("Welcome back! Login successful.")
         navigate(from, { replace: true })
      } catch (error) {
         console.error("Login failed:", error)
         const errorMessage = typeof error === "string" ? error : error?.message || "Login failed. Please check credentials."
         toast.error(errorMessage)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className="min-h-[90vh] py-12 px-4 flex items-center justify-center bg-gradient-to-b from-rose-50/50 via-white to-slate-50/50 relative overflow-hidden">
         {/* Atmospheric subtle glow */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-[140px] pointer-events-none" />
         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-100/50 rounded-full blur-[120px] pointer-events-none" />

         <div className="w-full max-w-xl relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <Card className="bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl shadow-rose-900/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600" />
                  {/* Brand Header */}
                  <div className="text-center space-y-3 mb-8">
                     <NavLink to="/" className="inline-flex items-center gap-2.5 mx-auto">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:scale-110 hover:rotate-6 transition-transform duration-300">
                           <Droplet className="w-6 h-6 fill-white" />
                        </div>
                     </NavLink>

                     <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                           Welcome Back
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">
                           Log in to access your donor dashboard & alerts
                        </p>
                     </div>
                  </div>

                  {/* Form */}
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Email Address
                                 </FormLabel>
                                 <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <FormControl>
                                       <Input
                                          placeholder="name@example.com"
                                          className="h-12 pl-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-rose-500 font-medium"
                                          {...field}
                                       />
                                    </FormControl>
                                 </div>
                                 <FormMessage className="text-xs text-rose-500 font-semibold" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <div className="flex items-center justify-between">
                                    <FormLabel className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                       Password
                                    </FormLabel>
                                    <Link
                                       to="/forgot-password"
                                       className="text-xs font-bold text-rose-600 hover:text-rose-700"
                                    >
                                       Forgot?
                                    </Link>
                                 </div>
                                 <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <FormControl>
                                       <Input
                                          type={showPassword ? "text" : "password"}
                                          placeholder="••••••••"
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
                                 <FormMessage className="text-xs text-rose-500 font-semibold" />
                              </FormItem>
                           )}
                        />

                        <Button
                           type="submit"
                           disabled={isLoading}
                           className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition-all text-sm mt-2"
                        >
                           {isLoading ? "Signing in..." : "Sign In to Account"}
                           <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                     </form>
                  </Form>

                  <div className="relative my-6">
                     <div className="absolute inset-0 flex items-center">
                        <Separator />
                     </div>
                     <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">
                           Or continue with
                        </span>
                     </div>
                  </div>

                  <GoogleLogin />

                  <div className="mt-8 text-center text-xs text-slate-500">
                     Don't have a donor account?{" "}
                     <Link to="/auth/register" className="text-rose-600 font-bold hover:underline">
                        Register as Donor
                     </Link>
                  </div>
               </Card>
            </motion.div>
         </div>
      </div>
   )
}

export default Login
