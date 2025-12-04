
import { motion } from "framer-motion"
import { MapPin, Info, Phone } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import bloodIcon from "@/assets/icon/blood.png"
import { Link } from "react-router-dom"
import CallNowButton from "../buttons/CallNowButton"

const DonorCard = ({ donor }) => {
   console.log(donor)

   return (
      <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
         <Card
            className="relative w-full bg-[#FFFFFF] py-8 px-5 gap-2 flex flex-col items-center border-none rounded-[8px]"
            style={{ boxShadow: "0px 0px 30px 0px #4242421A" }}
         >
            <motion.div
               className="absolute -top-10 -right-4 flex items-center justify-center text-white font-bold text-xl"
               initial={{ rotate: -10, scale: 0.9 }}
               animate={{ rotate: 0, scale: 1 }}
               transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
               }}
            >
               <div className="relative w-[60px] h-[97px] flex items-center justify-center">
                  <motion.img
                     src={bloodIcon}
                     alt="Blood"
                     className="absolute w-80 z-10 top-0 left-0 right-0 bottom-0"
                     whileHover={{ scale: 1.1 }}
                     transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  />
                  <motion.p
                     className="z-20 absolute -translate-y-1/2 top-1/2 transform"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.4 }}
                  >
                     {donor?.blood_group}
                  </motion.p>
               </div>
            </motion.div>
            <motion.div
               className="rounded-lg overflow-hidden -mt-16 bg-slate-200 w-[152px] h-[152px] mb-4"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               whileHover={{ scale: 1.05 }}
            >
               {donor?.profile_image ? (
                  <img
                     src={donor?.profile_image || "/placeholder.svg"}
                     alt="Donor profile"
                     className="w-full h-full object-cover bg-slate-100"
                  />
               ) : (
                  <div className="w-full h-full object-cover bg-slate-100"></div>
               )}
            </motion.div>

            <motion.h2
               className="text-xl font-semibold text-gray-800 "
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
            >
               {donor?.name}
            </motion.h2>

            {donor?.phone && <motion.div
               className="flex items-center text-gray-500"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
            >
               <Phone className="w-5 h-5 text-red-500 mr-1" />
               <span>{typeof donor?.phone === "string" && donor?.phone ? donor.phone : "N/A"}</span>
            </motion.div>}

            {donor?.address && <motion.div
               className="flex items-center text-gray-500"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
            >
               <MapPin className="w-5 h-5 text-red-500 mr-1" />
               <span>{typeof donor?.address === "string" && donor?.address ? donor.address : "N/A"}</span>
            </motion.div>}

            <div className="flex gap-2 w-full mt-3">
               <Link to={`/dashboard/find-donors/${String(donor?.user_id?._id)}`} className="w-full">
                  <Button
                     variant="outline"
                     className="w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all"
                  >
                     <Info className="w-4 h-4 mr-2" />
                     Details
                  </Button>
               </Link>

               <CallNowButton phone={donor?.phone} />
            </div>
         </Card>
      </motion.div>
   )
}

export default DonorCard
