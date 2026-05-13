
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppBanner from "../Home/Banner/AppBanner"
import DonorSection from "../Home/DonorSection/DonorSection"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound, HeartHandshake, Award, Users, Search, MapPin, CheckCircle2, Star, ShieldCheck, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const FindDonor = () => {
   const navigate = useNavigate();

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.2 }
      }
   }

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: { duration: 0.6, ease: "easeOut" }
      }
   }

   return (
      <div className="min-h-screen bg-slate-50/30 overflow-hidden">
         {/* Premium Hero Section */}
         <section className="relative pt-24 pb-16 overflow-hidden bg-white">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-60 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-40 -ml-48 -mb-48"></div>
            
            <div className="main-container relative z-10">
               <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-bold text-xs uppercase tracking-widest shadow-sm"
                  >
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                     </span>
                     Direct Match Platform
                  </motion.div>

                  <motion.h1 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]"
                  >
                     Find a Donor, <span className="text-rose-600">Save a Life</span>
                  </motion.h1>

                  <motion.p 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
                  >
                     Our advanced donor network connects you with verified local heroes ready to help in your time of need. Secure, fast, and 100% free.
                  </motion.p>

                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                  >
                     <div className="flex items-center gap-6 py-4 px-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex -space-x-3">
                           {[1, 2, 3, 4].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="Donor" />
                              </div>
                           ))}
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-black text-slate-800">5,000+ Active Donors</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Verified & Ready to help</p>
                        </div>
                     </div>
                  </motion.div>
                  
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="pt-4"
                  >
                     <Button 
                        onClick={() => window.scrollTo({ top: document.getElementById('donor-section').offsetTop - 100, behavior: 'smooth' })}
                        className="h-14 px-10 bg-slate-900 hover:bg-rose-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-200"
                     >
                        Start Search Now
                     </Button>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Original DonorSection - Now with improved filters */}
         <div id="donor-section">
            <DonorSection />
         </div>

         {/* How It Works Section - Redesigned */}
         <section className="py-24 bg-white relative overflow-hidden">
            <div className="main-container relative z-10">
               <div className="text-center mb-20 space-y-4">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">How It Works</h2>
                  <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                     A simple, 3-step process designed for maximum speed and efficiency in emergency situations.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <motion.div 
                     whileHover={{ y: -10 }}
                     className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-rose-100/30 group"
                  >
                     <div className="h-16 w-16 rounded-[1.5rem] bg-rose-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform">
                        <Search className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Smart Search</h3>
                     <p className="text-slate-500 font-medium leading-relaxed">
                        Use our intelligent filters to find donors by blood group, location, and availability in real-time.
                     </p>
                     <div className="absolute top-10 right-10 text-6xl font-black text-slate-100 -z-10 group-hover:text-rose-50 transition-colors">01</div>
                  </motion.div>

                  <motion.div 
                     whileHover={{ y: -10 }}
                     className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-rose-100/30 group"
                  >
                     <div className="h-16 w-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center mb-8 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">
                        <Users className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. Instant Match</h3>
                     <p className="text-slate-500 font-medium leading-relaxed">
                        Review detailed donor profiles and find the perfect match for your specific requirements.
                     </p>
                     <div className="absolute top-10 right-10 text-6xl font-black text-slate-100 -z-10 group-hover:text-slate-50 transition-colors">02</div>
                  </motion.div>

                  <motion.div 
                     whileHover={{ y: -10 }}
                     className="relative p-10 bg-slate-50 rounded-[3rem] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-rose-100/30 group"
                  >
                     <div className="h-16 w-16 rounded-[1.5rem] bg-rose-100 text-rose-600 flex items-center justify-center mb-8 shadow-lg shadow-rose-50 group-hover:scale-110 transition-transform">
                        <HeartHandshake className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Direct Contact</h3>
                     <p className="text-slate-500 font-medium leading-relaxed">
                        Connect directly with donors via secure call or message to coordinate the donation process.
                     </p>
                     <div className="absolute top-10 right-10 text-6xl font-black text-slate-100 -z-10 group-hover:text-rose-50 transition-colors">03</div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Success Stories - High Fidelity */}
         <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-600 rounded-full blur-[150px]"></div>
               <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]"></div>
            </div>

            <div className="main-container relative z-10">
               <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
                  <div className="space-y-4 text-center lg:text-left">
                     <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Stories of <span className="text-rose-500">Hope</span></h2>
                     <p className="text-slate-400 text-lg font-medium max-w-xl">
                        Real impact made by real people. Join our community of lifesavers today.
                     </p>
                  </div>
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 rounded-xl h-12 px-6">View All Stories</Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                     <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                     >
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 h-full hover:border-rose-500/50 transition-colors group">
                           <CardContent className="p-8">
                              <div className="flex gap-1 mb-6">
                                 {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-rose-500 text-rose-500" />)}
                              </div>
                              <p className="text-xl text-slate-200 font-medium italic mb-8 leading-relaxed">
                                 "{testimonial.quote}"
                              </p>
                              <div className="flex items-center gap-4">
                                 <Avatar className="h-14 w-14 border-2 border-slate-700 group-hover:border-rose-500 transition-colors">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                                    <AvatarFallback className="bg-rose-600 text-white font-bold">{testimonial.name[0]}</AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                                       <MapPin className="w-3 h-3 text-rose-500" />
                                       {testimonial.location}
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Global Stats - Premium Display */}
         <section className="py-24 bg-white">
            <div className="main-container">
               <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
                     {stats.map((stat, index) => (
                        <div key={index} className="space-y-4">
                           <div className="h-16 w-16 rounded-[1.5rem] bg-white shadow-xl shadow-slate-200 flex items-center justify-center mx-auto text-rose-600">
                              {stat.icon}
                           </div>
                           <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                           <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Trust Section */}
         <section className="py-16 bg-slate-50/50">
            <div className="main-container text-center">
               <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="flex items-center gap-2 text-2xl font-black text-slate-900">
                     <ShieldCheck className="w-8 h-8 text-rose-600" />
                     SECURE-LIFE
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-black text-slate-900">
                     <Heart className="w-8 h-8 text-rose-600" />
                     BLOOD-AID
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-black text-slate-900">
                     <CheckCircle2 className="w-8 h-8 text-rose-600" />
                     VERIFIED
                  </div>
               </div>
            </div>
         </section>

         <AppBanner />
      </div>
   )
}

// Sample data
const testimonials = [
   {
      quote: "I found a compatible donor within 2 hours during an emergency. This platform literally saved my mother's life. The direct contact feature is a game-changer.",
      name: "Sarah Johnson",
      location: "Dhaka, Bangladesh",
   },
   {
      quote: "The filtering system is incredibly accurate. I was able to find O- donors in my specific neighborhood within minutes. Truly a lifesaver.",
      name: "Michael Chen",
      location: "Chittagong, Bangladesh",
   },
   {
      quote: "As a frequent donor, I love how easy it is to manage my availability and connect with those who need help most. Very professional platform.",
      name: "David Williams",
      location: "Sylhet, Bangladesh",
   },
]

const stats = [
   { value: "15k+", label: "Successful Donations", icon: <Award className="w-8 h-8" /> },
   { value: "24/7", label: "Instant Support", icon: <ShieldCheck className="w-8 h-8" /> },
   { value: "99%", label: "Verified Donors", icon: <CheckCircle2 className="w-8 h-8" /> },
   { value: "64+", label: "Cities Covered", icon: <MapPin className="w-8 h-8" /> },
]

export default FindDonor
