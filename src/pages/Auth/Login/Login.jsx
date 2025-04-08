
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Mail, Lock } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import LogoRegular from "@/assets/logo/LogoRegular"
import { useDispatch } from "react-redux"
import { loginUser } from "@/redux-store/slices/auth-slice"
import { toast } from "sonner"

const formSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const Login = () => {
   const [isLoading, setIsLoading] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const from = location.state?.from?.pathname || "/"
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })



   const onSubmit = async (data) => {
      const { email, password } = data;
      setIsLoading(true);
      try {
         await dispatch(loginUser({ email, password })).unwrap();
         // console.log("Login successful:", resultAction);
         // toast.success("Login successful!");
         navigate(from, { replace: true });
      } catch (error) {
         console.error("Login failed:", error);
         const errorMessage = typeof error === "string" ? error : error?.message || "Login failed. Please try again.";
         toast.error(errorMessage);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen py-8 px-0 w-full  md:py-16 bg-gradient-to-b from-[#FF2156] to-[#FF2156] flex items-center justify-center">
         <div className="main-container">
            <div style={{ boxShadow: "0px 0px 30px 0px #4242421A", }} className="bg-[#FFFFFF] justify-center items-center w-full px-7 pb-14 pt-8 max-w-[480px]  flex mx-auto flex-col gap-4 rounded-[10px] ">
               <div className="font-bold text-lg mb-8">
                  <NavLink to="/" className="flex flex-col gap-2 items-center mt-3 space-x-2">
                     <LogoRegular className="w-10" />   <p><span className="text-[#FF2156] tracking-tighter font-medium text-lg ">Dare </span>
                        <span className='text-[#595959] font-normal'>To</span>   <span className="text-[#FF2156] tracking-tighter font-medium text-lg ">  Donate</span></p>
                  </NavLink>

                  <p className="text-gray-700 font-semibold text-[24px] text-center mt-4">Log in</p>
               </div>

               {/* Login Form */}
               <div className="w-full max-w-md">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <div className="flex items-center  bg-gray-50 rounded-md">
                                    <div className="px-3 py-2">
                                       <Mail color="#FF2156" className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <FormControl>
                                       <Input
                                          placeholder="Email"
                                          className="border-0 py-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                          {...field}
                                       />
                                    </FormControl>
                                 </div>
                                 <FormMessage className="text-xs mt-1" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <div className="flex items-center bg-gray-50 rounded-md">
                                    <div className="px-3 py-2">
                                       <Lock color="#FF2156" className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <FormControl>
                                       <Input
                                          type="password"
                                          placeholder="Password"
                                          className="border-0 py-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                          {...field}
                                       />
                                    </FormControl>
                                 </div>
                                 <FormMessage className="text-xs mt-1" />
                              </FormItem>
                           )}
                        />

                        <Button
                           type="submit"
                           className="w-full bg-[#ff3366] cursor-pointer hover:bg-[#e62e5c] text-white font-medium py-6"
                           disabled={isLoading || !form.formState.isValid}
                        >
                           {isLoading ? "LOGGING IN..." : "LOG IN"}
                        </Button>
                     </form>
                  </Form>

                  <div className="mt-4 text-center">
                     <Link to="/forgot-password" className="text-[#ff3366] text-sm hover:underline">
                        Forgot Password?
                     </Link>
                  </div>

                  <div className="mt-10 text-center text-gray-600">
                     Don&apos;t have an account?{" "}
                     <Link to="/register" className="text-[#ff3366] font-medium hover:underline">
                        Register Now
                     </Link>
                     .
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login

