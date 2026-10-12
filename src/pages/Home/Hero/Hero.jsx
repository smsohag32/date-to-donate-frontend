import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Heart, Users, Search, Droplet, ShieldCheck, Clock, MapPin, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import heroContent from "@/data/hero-content"
import { motion } from "framer-motion"
import "./hero.css"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const districts = [
   "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Gazipur"
]

const Hero = () => {
   const navigate = useNavigate()
   const item = heroContent[0]
   const [selectedGroup, setSelectedGroup] = useState("")
   const [selectedLocation, setSelectedLocation] = useState("")

   const handleHeroSearch = (e) => {
      e.preventDefault()
      // Scroll to donor section or pass filters
      const donorSection = document.getElementById("donor-section")
      if (donorSection) {
         donorSection.scrollIntoView({ behavior: "smooth" })
      } else {
         navigate("/find-donor")
      }
   }

   return (
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-slate-50/50 pt-8 pb-16">
         {/* Atmospheric Ambient Glows */}
         <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-rose-200/40 blur-[130px]" />
            <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full bg-red-100/50 blur-[120px]" />
            <div className="absolute -bottom-24 left-1/3 w-[400px] h-[400px] rounded-full bg-amber-100/30 blur-[100px]" />
         </div>

         <div className="main-container relative z-10 w-full">
            {/* Live Emergency Ticker */}
            <motion.div
               initial={{ opacity: 0, y: -15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="mb-8 max-w-2xl mx-auto lg:mx-0"
            >
               <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-rose-200/80 shadow-xs backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                  </span>
                  <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                     Urgent Match Alert:
                  </span>
                  <span className="text-xs font-semibold text-slate-700 truncate">
                     O- blood urgently needed at Central Hospital Dhaka
                  </span>
                  <Link
                     to="/find-donor"
                     className="text-xs font-bold text-rose-600 hover:text-rose-700 underline ml-1 hidden sm:inline"
                  >
                     View →
                  </Link>
               </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
               {/* Left Column: Headline & Action */}
               <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                     <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]"
                     >
                        Every Drop Counts.{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600">
                           Save a Life Today.
                        </span>
                     </motion.h1>

                     <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
                     >
                        Join Bangladesh's premier voluntary blood donor community. Connect with compassionate donors in minutes during emergencies. 100% voluntary, direct, and completely free.
                     </motion.p>
                  </div>

                  {/* Primary CTA Buttons */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                     <Link to="/auth/register">
                        <Button className="h-14 px-8 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-base font-bold shadow-xl shadow-rose-200 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                           <Heart className="mr-2 h-5 w-5 fill-white" />
                           Become a Lifesaver
                        </Button>
                     </Link>

                     <Link to="/find-donor">
                        <Button
                           variant="outline"
                           className="h-14 px-8 border-2 border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50 rounded-2xl text-base font-bold transition-all w-full sm:w-auto"
                        >
                           <Users className="mr-2 h-5 w-5 text-rose-600" />
                           Find Donors Fast
                        </Button>
                     </Link>
                  </motion.div>

                  {/* Hero Quick Search Box */}
                  <motion.div
                     initial={{ opacity: 0, y: 25 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 max-w-2xl mx-auto lg:mx-0"
                  >
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">
                        ⚡ Quick Emergency Match Filter
                     </p>
                     <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-4">
                           <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                              <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-800 font-semibold text-sm">
                                 <SelectValue placeholder="Blood Group" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                 {bloodGroups.map((bg) => (
                                    <SelectItem key={bg} value={bg} className="font-semibold">
                                       {bg} Group
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="sm:col-span-5">
                           <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                              <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-800 font-semibold text-sm">
                                 <SelectValue placeholder="District / City" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                 {districts.map((d) => (
                                    <SelectItem key={d} value={d} className="font-semibold">
                                       {d}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="sm:col-span-3">
                           <Button
                              type="submit"
                              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md transition-all hover:bg-rose-600"
                           >
                              <Search className="w-4 h-4 mr-1.5" />
                              Search
                           </Button>
                        </div>
                     </form>
                  </motion.div>

                  {/* Trust metrics & active donor count */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.6, delay: 0.4 }}
                     className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-left"
                  >
                     <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                           <div
                              key={i}
                              className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100"
                           >
                              <img
                                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 35}`}
                                 alt="Active Donor"
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                           +5k
                        </div>
                     </div>

                     <div>
                        <p className="text-slate-900 font-extrabold text-sm leading-tight">
                           5,200+ Verified Donors Ready
                        </p>
                        <p className="text-slate-500 text-xs font-medium">
                           Average response time: <strong className="text-rose-600">Under 15 mins</strong>
                        </p>
                     </div>
                  </motion.div>
               </div>

               {/* Right Column: Hero Visual Mockup & Floating Badges */}
               <div className="lg:col-span-5 relative">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8 }}
                     className="relative mx-auto max-w-[460px]"
                  >
                     {/* Glow Underlay */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-red-400/10 rounded-[3rem] blur-2xl transform rotate-3 scale-95" />

                     {/* Main Hero Card Container */}
                     <div className="relative z-10 bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-md p-4 sm:p-6 rounded-[2.5rem] border border-white/60 shadow-2xl shadow-rose-900/10 overflow-hidden group">
                        <img
                           src={item.image}
                           alt="Dare To Donate Hero"
                           className="w-full h-auto rounded-[2rem] object-cover drop-shadow-md group-hover:scale-[1.02] transition-transform duration-700"
                        />

                        {/* Top floating badge */}
                        <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
                           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                           <span className="text-xs font-extrabold text-slate-800">
                              Active Community
                           </span>
                        </div>

                        {/* Bottom floating Emergency 24/7 card */}
                        <motion.div
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.5, duration: 0.6 }}
                           className="absolute bottom-8 left-8 right-8 bg-slate-900/90 text-white backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between"
                        >
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0">
                                 <Droplet className="w-5 h-5 fill-white text-white" />
                              </div>
                              <div>
                                 <p className="text-xs font-bold text-slate-300">Need Immediate Blood?</p>
                                 <p className="text-sm font-extrabold text-white">Call 24/7 Free Hotline</p>
                              </div>
                           </div>
                           <a
                              href="tel:+8801800366283"
                              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shrink-0"
                           >
                              Call Now
                           </a>
                        </motion.div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Hero
