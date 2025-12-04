"use client"

import { motion } from "framer-motion"

export default function Loading() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
         {/* Animated Background Elements */}
         <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
         >
            <motion.div
               className="absolute top-20 left-10 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
               animate={{
                  y: [0, 30, 0],
                  x: [0, 20, 0],
               }}
               transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            />
            <motion.div
               className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
               animate={{
                  y: [0, -30, 0],
                  x: [0, -20, 0],
               }}
               transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            />
         </motion.div>

         {/* Main Content Container */}
         <div className="relative z-10 flex flex-col items-center">
            {/* Blood Drop Icon with Advanced Animation */}
            <motion.div
               className="mb-8"
               animate={{
                  scale: [1, 1.05, 1],
                  y: [0, -15, 0],
               }}
               transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            >
               <div className="relative w-20 h-32">
                  <svg
                     viewBox="0 0 100 150"
                     className="w-full h-full"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     {/* Shadow effect */}
                     <defs>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                           <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.2" />
                        </filter>
                        <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="#fb7185" />
                           <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                     </defs>

                     {/* Main drop */}
                     <path
                        d="M50 0C50 0 0 70 0 100C0 128 22 150 50 150C78 150 100 128 100 100C100 70 50 0 50 0Z"
                        fill="url(#dropGradient)"
                        stroke="#991b1b"
                        strokeWidth="1.5"
                        filter="url(#shadow)"
                     />

                     {/* Shine effect */}
                     <ellipse cx="35" cy="40" rx="12" ry="20" fill="white" opacity="0.3" />
                  </svg>
               </div>
            </motion.div>

            {/* Loading Text with Dots Animation */}
            <div className="flex flex-col items-center gap-6">
               <div className="text-center">
                  <motion.h2
                     className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5 }}
                  >
                     Processing Your Data
                  </motion.h2>
                  <motion.p
                     className="text-sm text-slate-500 mt-2"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5, delay: 0.1 }}
                  >
                     Please wait while we secure your information
                  </motion.p>
               </div>

               {/* Animated Dots */}
               <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
               >
                  {[0, 1, 2].map((i) => (
                     <motion.div
                        key={i}
                        className="w-3 h-3 bg-gradient-to-b from-rose-500 to-red-600 rounded-full"
                        animate={{
                           scale: [1, 1.2, 1],
                           opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                           duration: 1.4,
                           repeat: Infinity,
                           delay: i * 0.15,
                           ease: "easeInOut",
                        }}
                     />
                  ))}
               </motion.div>
            </div>

            {/* Progress Indicator */}
            <motion.div
               className="mt-10 w-48 h-1 bg-slate-200 rounded-full overflow-hidden"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
            >
               <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 rounded-full"
                  animate={{
                     x: ["-100%", "100%"],
                  }}
                  transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
               />
            </motion.div>
         </div>

         {/* Footer Text */}
         <motion.p
            className="absolute bottom-8 text-xs text-slate-400 text-center max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
         >
            Your data is encrypted and secure
         </motion.p>
      </div>
   )
}