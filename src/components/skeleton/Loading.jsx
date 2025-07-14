"use client"

import { motion } from "framer-motion"

export default function Loading() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
         {/* Blood Drop Icon with Subtle Bobbing */}
         <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
               duration: 1.5,
               repeat: Infinity,
               ease: "easeInOut",
            }}
            className="w-14 h-26 mb-6"
         >
            <svg
               viewBox="0 0 100 150"
               className="w-full h-full"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M50 0C50 0 0 70 0 100C0 128 22 150 50 150C78 150 100 128 100 100C100 70 50 0 50 0Z"
                  fill="#f43f5e"
                  stroke="#e11d48"
                  strokeWidth="2"
               />
            </svg>
         </motion.div>

         {/* Animated "Loading..." text */}
         <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
               duration: 1.2,
               repeat: Infinity,
               repeatType: "reverse",
               ease: "easeInOut",
            }}
            className="text-xl font-semibold text-rose-600"
         >
            <span>Loading</span>
            <motion.span
               className="inline-block ml-1"
               variants={{
                  animate: {
                     content: ["", ".", "..", "..."],
                     transition: {
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "linear",
                     },
                  },
               }}
               animate="animate"
            />
         </motion.div>
      </div>
   )
}
