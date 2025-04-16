"use client"

import { motion } from "framer-motion"

export default function Loading() {
   return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
         <div className="relative w-32 h-48">
            {/* Blood drop container */}
            <div className="absolute inset-0 flex items-center justify-center">
               <svg viewBox="0 0 100 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M50 0C50 0 0 70 0 100C0 128 22 150 50 150C78 150 100 128 100 100C100 70 50 0 50 0Z"
                     fill="#f1f5f9"
                     stroke="#e11d48"
                     strokeWidth="2"
                  />
               </svg>
            </div>

            {/* Animated filling effect */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
               <motion.div
                  initial={{ height: "0%" }}
                  animate={{ height: "85%" }}
                  transition={{
                     duration: 2,
                     repeat: Number.POSITIVE_INFINITY,
                     repeatType: "reverse",
                     ease: "easeInOut",
                  }}
                  className="w-[90px] rounded-b-full bg-red-600 opacity-90"
               />
            </div>

            {/* Pulse effect */}
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1.1, opacity: 0 }}
                  transition={{
                     duration: 1.5,
                     repeat: Number.POSITIVE_INFINITY,
                     ease: "easeOut",
                  }}
                  className="w-full h-full rounded-full border-2 border-red-500"
               />
            </div>
         </div>
         <motion.p
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
               duration: 1,
               repeat: Number.POSITIVE_INFINITY,
               repeatType: "reverse",
               ease: "easeInOut",
            }}
            className="text-lg font-medium text-red-600 mt-6"
         >
            Preparing your donation...
         </motion.p>
      </div>
   )
}
