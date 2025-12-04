import { motion } from "framer-motion"
import { MapPin, Info, Phone, User } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import bloodIcon from "@/assets/icon/blood.png"
import { Link } from "react-router-dom"
import CallNowButton from "../buttons/CallNowButton"

const DonorCard = ({ donor }) => {
   console.log(donor)

   return (
      <motion.div
         whileHover={{ y: -8 }}
         transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
         <Card
            className="relative w-full bg-gradient-to-br from-white to-gray-50 py-6 px-6 gap-0 flex flex-col items-center border border-gray-100 rounded-xl "
            style={{
               boxShadow: "0px 4px 20px 0px rgba(66, 66, 66, 0.08), 0px 0px 1px 0px rgba(66, 66, 66, 0.12)"
            }}
         >
            {/* Blood Type Badge */}
            <motion.div
               className="absolute -top-3 -right-0 flex items-center justify-center z-30"
               initial={{ rotate: -15, scale: 0.8 }}
               animate={{ rotate: 0, scale: 1 }}
               transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
               }}
            >
               <div className="relative w-[70px] h-[110px] flex items-center justify-center">
                  <motion.img
                     src={bloodIcon}
                     alt="Blood"
                     className="absolute w-52 z-10"
                     whileHover={{ scale: 1.15 }}
                     transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  />
                  <motion.p
                     className="z-20 absolute top-1/2 font-bold text-white text-lg"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                  >
                     {donor?.blood_group}
                  </motion.p>
               </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
               className="rounded-b-2xl overflow-hidden -mt-6 bg-gradient-to-br from-gray-100 to-gray-200 w-[140px] h-[140px] mb-6 ring-4 ring-white shadow-md flex-shrink-0"
               initial={{ opacity: 0, scale: 0.7 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               whileHover={{ scale: 1.08 }}
            >
               {donor?.profile_image ? (
                  <img
                     src={donor?.profile_image || "/placeholder.svg"}
                     alt="Donor profile"
                     className="w-full h-full object-cover"
                  />
               ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                     <User className="w-16 h-16 text-gray-400" />
                  </div>
               )}
            </motion.div>

            {/* Donor Name */}
            <motion.h2
               className="text-2xl font-bold text-gray-900 text-center tracking-tight"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
            >
               {donor?.name}
            </motion.h2>

            {/* Phone Information */}
            {donor?.phone && (
               <motion.div
                  className="flex items-center justify-center gap-2 text-gray-600 mt-3 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
               >
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="font-medium">
                     {typeof donor?.phone === "string" && donor?.phone ? donor.phone : "N/A"}
                  </span>
               </motion.div>
            )}

            {/* Address Information */}
            {donor?.address && (
               <motion.div
                  className="flex items-center justify-center gap-2 text-gray-600 mt-2 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
               >
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="font-medium truncate max-w-xs">
                     {typeof donor?.address === "string" && donor?.address ? donor.address : "N/A"}
                  </span>
               </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 w-full mt-6 pt-4 border-t border-gray-100">
               <Link to={`/dashboard/find-donors/${String(donor?.user_id?._id)}`} className="flex-1">
                  <Button
                     variant="outline"
                     className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all font-medium py-5"
                  >
                     <Info className="w-4 h-4 mr-2" />
                     Details
                  </Button>
               </Link>

               <div className="flex-1">
                  <CallNowButton phone={donor?.phone} />
               </div>
            </div>
         </Card>
      </motion.div>
   )
}

export default DonorCard