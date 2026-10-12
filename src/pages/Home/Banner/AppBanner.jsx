import appScreenshot from "@/assets/banner/app.webp"
import playStoreImage from "@/assets/banner/play-store.webp"
import { Bell, Smartphone, ShieldCheck, Star, QrCode, Download, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const AppBanner = () => {
   return (
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
         {/* Background ambient lighting */}
         <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
         <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />

         <div className="main-container relative z-10">
            <div className="rounded-[3rem] bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-rose-950/40 border border-slate-700/60 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Information & Download Links */}
                  <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                     <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                           <Smartphone className="w-3.5 h-3.5" />
                           Mobile App Experience
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                           Emergency Lifesaving Alerts,{" "}
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-400">
                              Direct to Your Phone
                           </span>
                        </h2>

                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                           Get instantaneous notifications when someone with your exact blood type needs urgent help near your location. Manage your donation schedule and track lives saved.
                        </p>
                     </div>

                     {/* Feature Pills */}
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                           <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                              <Bell className="w-4 h-4" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs font-bold text-white">Live Push Alerts</p>
                              <p className="text-[11px] text-slate-400">Under 60 seconds</p>
                           </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                           <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                              <ShieldCheck className="w-4 h-4" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs font-bold text-white">Verified Donors</p>
                              <p className="text-[11px] text-slate-400">Safe coordination</p>
                           </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
                           <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                              <Heart className="w-4 h-4" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs font-bold text-white">Digital Donor ID</p>
                              <p className="text-[11px] text-slate-400">Track impact</p>
                           </div>
                        </div>
                     </div>

                     {/* Download CTAs & Play Store Badge */}
                     <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <a
                           href="#download"
                           className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                           <img src={playStoreImage} alt="Google Play" className="w-6 h-6 object-contain" />
                           <div className="text-left">
                              <p className="text-[10px] text-slate-500 uppercase leading-none font-bold">Get It On</p>
                              <p className="text-xs font-black text-slate-900 leading-tight">Google Play</p>
                           </div>
                        </a>

                        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
                           <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                           <span className="font-bold text-white">4.9/5 Rating</span>
                           <span className="text-slate-400">• Free Voluntary App</span>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Visual App Screenshot Showcase */}
                  <div className="lg:col-span-5 flex justify-center">
                     <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                        className="relative max-w-[340px] sm:max-w-[380px]"
                     >
                        {/* Glow Behind Mockup */}
                        <div className="absolute inset-0 bg-rose-500/30 rounded-[3rem] blur-2xl transform rotate-3" />

                        {/* Image Wrapper */}
                        <div className="relative z-10 rounded-[2.5rem] p-3 bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-600 shadow-2xl overflow-hidden">
                           <img
                              src={appScreenshot || "/placeholder.svg"}
                              alt="Dare To Donate Mobile Application Preview"
                              className="w-full h-auto rounded-[2rem] object-cover"
                           />

                           {/* Floating Notification Card */}
                           <div className="absolute bottom-6 left-6 right-6 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-xl flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0">
                                 <Bell className="w-5 h-5 text-white animate-bounce" />
                              </div>
                              <div className="text-left">
                                 <p className="text-xs font-bold text-white">Blood Match Request</p>
                                 <p className="text-[11px] text-slate-300 truncate">Hospital needed B+ • 2.4 km away</p>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AppBanner
