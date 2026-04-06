import { motion } from "framer-motion"
import { MapPin, Info, Phone, User, Calendar, Droplet } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import CallNowButton from "../buttons/CallNowButton"

const DonorCard = ({ donor }) => {
   // Availability Status Logic (Simplified for demonstration)
   const isAvailable = donor?.is_available !== false; 

   return (
      <motion.div
         whileHover={{ y: -10 }}
         transition={{ type: "spring", stiffness: 300, damping: 18 }}
         className="h-full"
      >
         <Card
            className="group relative h-full w-full bg-white overflow-hidden flex flex-col border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-rose-100/30 rounded-[2.5rem]"
         >
            {/* 1. Header: Status & Blood Group */}
            <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
               <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5 ${
                  isAvailable 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                  : "bg-amber-50 text-amber-600 border-amber-100"
               }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
                  {isAvailable ? "Available" : "On Break"}
               </div>
               
               <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg px-4 py-2 rounded-2xl flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
                  <Droplet className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="text-lg font-black text-slate-800 tracking-tighter">{donor?.blood_group}</span>
               </div>
            </div>

            <div className="p-6 pb-4 flex flex-col items-center flex-grow">
               {/* 2. Compact Avatar */}
               <div className="relative mt-12 mb-6">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-rose-100 to-rose-50 rounded-full opacity-40 blur-xl group-hover:opacity-60 transition-opacity" />
                  <div className="relative w-24 h-24 rounded-full p-1 bg-white shadow-lg ring-1 ring-slate-100">
                     <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                        {donor?.profile_image ? (
                           <img
                              src={donor?.profile_image}
                              alt={donor?.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                           />
                        ) : (
                           <User className="w-10 h-10 text-slate-300" />
                        )}
                     </div>
                  </div>
               </div>

               {/* 3. Identity Section */}
               <div className="text-center space-y-2 mb-6">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-rose-600 transition-colors duration-300 px-2 line-clamp-1">
                     {donor?.name}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-slate-500">
                     <MapPin className="w-3 h-3 text-rose-500" />
                     <span className="text-[10px] font-bold uppercase tracking-tight">{donor?.address || "Unknown"}</span>
                  </div>
               </div>

               {/* 4. Visible & Functional Contact Area */}
               <div className="w-full mb-6">
                  <CallNowButton 
                     phone={donor?.phone} 
                     variant="ghost" 
                     className="w-full h-12 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 rounded-2xl group/phone transition-all px-4"
                  >
                     <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/phone:text-rose-500 group-hover/phone:border-rose-100 transition-colors">
                              <Phone className="w-4 h-4" />
                           </div>
                           <div className="flex flex-col items-start text-left">
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter leading-none mb-1">Phone Number</span>
                              <span className="text-sm font-bold text-slate-700 group-hover/phone:text-rose-600 transition-colors tracking-tight italic">
                                 {donor?.phone || "N/A"}
                              </span>
                           </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     </div>
                  </CallNowButton>
               </div>
            </div>

            {/* 5. Footer: Compact Action Buttons */}
            <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3 mt-auto">
               <Link to={`/dashboard/find-donors/${String(donor?.user_id?._id)}`} className="w-full">
                  <Button
                     variant="outline"
                     className="w-full border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl font-bold h-11 transition-all duration-300"
                  >
                     <Info className="w-3.5 h-3.5 mr-1.5" />
                     Details
                  </Button>
               </Link>

               <CallNowButton 
                  phone={donor?.phone} 
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-lg shadow-rose-100 font-bold h-11 transition-all duration-300 active:scale-95"
               />
            </div>
         </Card>
      </motion.div>
   )
}

export default DonorCard