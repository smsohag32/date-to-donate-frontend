import { useState, useEffect } from "react"
import { PhoneCall, ArrowUp, Droplet, Search, X, Heart, ShieldAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

const FloatingEmergencyBar = () => {
   const [showScrollTop, setShowScrollTop] = useState(false)
   const [isExpanded, setIsExpanded] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         setShowScrollTop(window.scrollY > 300)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
   }

   return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
         {/* Expanded Quick Emergency Card */}
         <AnimatePresence>
            {isExpanded && (
               <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-72 bg-white/95 backdrop-blur-xl border border-rose-200 shadow-2xl shadow-rose-900/20 rounded-3xl p-5 mb-1"
               >
                  <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                     <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                        <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                           Emergency Blood Help
                        </span>
                     </div>
                     <button
                        onClick={() => setIsExpanded(false)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Close emergency menu"
                     >
                        <X className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="py-3 space-y-2">
                     <a
                        href="tel:01540042699"
                        className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50 hover:bg-rose-100/80 border border-rose-100 text-rose-700 transition-all group"
                     >
                        <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                           <PhoneCall className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                           <p className="text-[11px] font-bold uppercase text-rose-500 tracking-tight leading-none">
                              Direct 24/7 Hotline
                           </p>
                           <p className="text-xs font-extrabold text-slate-900 mt-1">
                              01540042699
                           </p>
                        </div>
                     </a>

                     <Link
                        to="/find-donor"
                        onClick={() => setIsExpanded(false)}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 text-slate-700 transition-all group"
                     >
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                           <Search className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                           <p className="text-[11px] font-bold uppercase text-slate-400 tracking-tight leading-none">
                              Immediate Search
                           </p>
                           <p className="text-xs font-extrabold text-slate-900 mt-1">
                              Find Nearby Donors
                           </p>
                        </div>
                     </Link>
                  </div>

                  <p className="text-[10px] text-center text-slate-400 pt-1">
                     100% Free & Voluntary Lifesaver Network
                  </p>
               </motion.div>
            )}
         </AnimatePresence>

         <div className="flex items-center gap-2">
            {/* Scroll To Top Button */}
            <AnimatePresence>
               {showScrollTop && (
                  <motion.button
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     onClick={scrollToTop}
                     className="w-12 h-12 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                     aria-label="Scroll to top"
                  >
                     <ArrowUp className="w-5 h-5" />
                  </motion.button>
               )}
            </AnimatePresence>

            {/* Emergency Hotline Trigger Button */}
            <motion.button
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsExpanded(!isExpanded)}
               className={`h-12 px-4 sm:px-5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all cursor-pointer ${
                  isExpanded
                     ? "bg-slate-900 text-white shadow-slate-900/30"
                     : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/40 hover:scale-105"
               }`}
            >
               <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
               </span>
               <PhoneCall className="w-4 h-4" />
               <span className="tracking-tight">Emergency Blood</span>
            </motion.button>
         </div>
      </div>
   )
}

export default FloatingEmergencyBar
