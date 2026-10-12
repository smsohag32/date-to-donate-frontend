import { Droplet, Home, Search, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function NotFound() {
   return (
      <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-rose-50/40 via-white to-slate-50/50 px-4 py-16 text-center relative overflow-hidden">
         <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-rose-200/30 rounded-full blur-[140px] pointer-events-none" />

         <div className="relative z-10 max-w-lg mx-auto space-y-8">
            {/* Animated Droplet badge */}
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.5 }}
               className="mx-auto w-24 h-24 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center shadow-lg shadow-rose-200/40"
            >
               <Droplet className="w-12 h-12 text-rose-600 fill-rose-600 animate-pulse" />
            </motion.div>

            <div className="space-y-3">
               <span className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tighter">
                  4<span className="text-rose-600">0</span>4
               </span>
               <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Page Not Found
               </h1>
               <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto">
                  The page you are looking for may have been moved or is unavailable. Don't worry — finding blood donors is still just one click away.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
               <Link to="/">
                  <Button className="w-full sm:w-auto h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md">
                     <Home className="mr-2 h-4 w-4" />
                     Return to Home
                  </Button>
               </Link>
               <Link to="/find-donor">
                  <Button className="w-full sm:w-auto h-12 px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200">
                     <Search className="mr-2 h-4 w-4" />
                     Search Blood Donors
                  </Button>
               </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
               Need emergency assistance?{" "}
               <Link to="/contact-us" className="text-rose-600 font-bold hover:underline">
                  Contact our 24/7 Helpline
               </Link>
            </div>
         </div>
      </div>
   )
}
