import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Mail, Lock, User, Phone, MapPin, Droplet } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LogoRegular from "@/assets/logo/LogoRegular";

const formSchema = z.object({
   email: z.string().email({ message: "Please enter a valid email address" }),
   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
   first_name: z.string().min(1, { message: "First name is required" }),
   last_name: z.string().min(1, { message: "Last name is required" }),
   phone: z.string().min(10, { message: "Enter a valid phone number" }),
   blood_group: z.string().min(1, { message: "Blood group is required" }),
   address: z.object({
      street: z.string().min(1, { message: "Street address is required" }),
      city: z.string().min(1, { message: "City is required" }),
      state: z.string().min(1, { message: "State is required" }),
      zip: z.string().min(1, { message: "ZIP code is required" }),
      country: z.string().min(1, { message: "Country is required" })
   })
});

const Register = () => {
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
         first_name: "",
         last_name: "",
         phone: "",
         blood_group: "",
         address: {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: ""
         }
      }
   });

   const onSubmit = async (data) => {
      setIsLoading(true);
      try {
         console.log("Register data:", data);
         await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
         console.error("Registration failed:", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen py-16 main-container">
         <div className="bg-[#FFFFFF] w-full px-7 pb-14 pt-8  max-w-3xl  flex mx-auto flex-col gap-4 rounded-[10px] shadow-lg">
            <div className="font-bold text-lg mb-8 text-center">
               <NavLink to="/" className="flex flex-col gap-2 items-center mt-3">
                  <LogoRegular className="w-10" />
                  <p><span className="text-[#FF2156] font-medium">Dare </span>
                     <span className='text-[#595959] font-normal'>To</span>
                     <span className="text-[#FF2156] font-medium"> Donate</span></p>
               </NavLink>
               <p className="text-gray-700 font-semibold text-[24px] mt-4">Register</p>
            </div>

            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 lg:grid-cols-2">
                  {["first_name", "last_name", "email", "phone", "password"].map((item) => (
                     <FormField
                        key={item}
                        control={form.control}
                        name={item}
                        render={({ field }) => (
                           <FormItem>
                              <div className="flex items-center bg-gray-50 rounded-md">
                                 <div className="px-3 py-2">
                                    {field.name === "email" ? <Mail color="#FF2156" className="h-5 w-5" /> :
                                       field.name === "password" ? <Lock color="#FF2156" className="h-5 w-5" /> :
                                          field.name === "phone" ? <Phone color="#FF2156" className="h-5 w-5" /> :
                                             <User color="#FF2156" className="h-5 w-5" />}
                                 </div>
                                 <FormControl>
                                    <Input
                                       type={field.name === "password" ? "password" : "text"}
                                       placeholder={field?.name?.replace("_", " ")?.toUpperCase()}
                                       className="border-0 py-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                       {...field}
                                    />
                                 </FormControl>
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  ))}

                  <FormField
                     control={form.control}
                     name="blood_group"
                     render={({ field }) => (
                        <FormItem>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="bg-gray-50 w-full rounded-md px-3 py-5">
                                 <Droplet color="#FF2156" className="h-5 w-5 mr-2" />
                                 <SelectValue placeholder="Select Blood Group" />
                              </SelectTrigger>
                              <SelectContent>
                                 {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                                    <SelectItem key={group} value={group}>{group}</SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {["street", "city", "state", "zip", "country"].map((field) => (
                     <FormField
                        key={field}
                        control={form.control}
                        name={`address.${field}`}
                        render={({ field }) => (
                           <FormItem>
                              <div className="flex items-center bg-gray-50 rounded-md">
                                 <div className="px-3 py-2">
                                    <MapPin color="#FF2156" className="h-5 w-5" />
                                 </div>
                                 <FormControl>
                                    <Input
                                       placeholder={field.name.toUpperCase()} // 
                                       className="border-0 py-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                       {...field}
                                    />
                                 </FormControl>
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  ))}

                  <Button type="submit" className="w-full bg-[#ff3366] hover:bg-[#e62e5c] text-white font-medium py-6" disabled={isLoading}>
                     {isLoading ? "REGISTERING..." : "REGISTER"}
                  </Button>
               </form>
            </Form>

            <div className="mt-10 text-center text-gray-600">
               Already have an account? {" "}
               <Link to="/login" className="text-[#ff3366] font-medium hover:underline">Log in</Link>.
            </div>
         </div>
      </div>
   );
};

export default Register;
