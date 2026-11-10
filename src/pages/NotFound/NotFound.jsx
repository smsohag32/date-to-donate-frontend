import { Droplet, Home, Search, PhoneCall, HeartHandshake, ArrowRight, ShieldAlert, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function NotFound() {
   const quickLinks = [
      {
         title: "Find Blood Donors",
         desc: "Search verified local donors by blood group",
         to: "/find-donor",
         icon: Search,
         accent: "text-rose-600 bg-rose-50 border-rose-100",
      },
      {
         title: "Request Blood",
         desc: "Manage or create an urgent donation request",
         to: "/dashboard/donation-request",
         icon: HeartHandshake,
         accent: "text-red-600 bg-red-50 border-red-100",
      },
      {
         title: "Return to Homepage",
         desc: "Explore latest drives, impact stories and stats",
         to: "/",
         icon: Home,
         accent: "text-slate-800 bg-slate-100 border-slate-200",
      },
      {
         title: "24/7 Helpline Support",
         desc: "Contact emergency assistance team directly",
         to: "/contact-us",
         icon: PhoneCall,
         accent: "text-emerald-700 bg-emerald-50 border-emerald-100",
      },
   ]

   return (
      <div className="min-h-[88vh] flex items-center justify-center bg-gradient-to-b from-rose-50/50 via-white to-slate-50/60 px-4 py-16 relative overflow-hidden">
         {/* Ambient decorative blobs */}
         <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-rose-200/30 rounded-full blur-[140px] pointer-events-none" />
         <div className="absolute bottom-10 right-1/4 w-[380px] h-[380px] bg-red-100/40 rounded-full blur-[120px] pointer-events-none" />

         <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
            {/* Animated Lifesaving Droplet Badge */}
            <motion.div
               initial={{ scale: 0.85, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="inline-flex flex-col items-center gap-3"
            >
               <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-100/60 flex items-center justify-center">
                     <Droplet className="w-12 h-12 text-rose-600 fill-rose-600 animate-pulse" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                     <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 border-2 border-white" />
                  </span>
               </div>

               <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Error 404 • Lost in Transit
               </div>
            </motion.div>

            {/* Heading & Subtitle */}
            <div className="space-y-3">
               <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-none">
                  4<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600">0</span>4
               </h1>
               <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Oops! We Couldn't Find That Page
               </h2>
               <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                  The page you are looking for might have been relocated, removed, or temporarily unavailable. But saving a life is always within reach.
               </p>
            </div>

            {/* Quick Destination Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
               {quickLinks.map((item, idx) => {
                  const Icon = item.icon
                  return (
                     <Link
                        key={idx}
                        to={item.to}
                        className="group p-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 hover:border-rose-200 shadow-xs hover:shadow-lg hover:shadow-rose-100/40 transition-all duration-200 flex items-center gap-3.5"
                     >
                        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${item.accent}`}>
                           <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                                 {item.title}
                              </p>
                              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                           </div>
                           <p className="text-xs text-slate-500 truncate mt-0.5">
                              {item.desc}
                           </p>
                        </div>
                     </Link>
                  )
               })}
            </div>

            {/* Emergency Hotline Alert */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                     <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-slate-900">Critical Emergency?</p>
                     <p className="text-[11px] text-slate-600">Immediate blood support hotline is available 24/7</p>
                  </div>
               </div>
               <a
                  href="tel:01540042699"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all shrink-0 flex items-center gap-1.5"
               >
                  <PhoneCall className="w-3.5 h-3.5" />
                  01540042699
               </a>
            </div>
         </div>
      </div>
   )
}
