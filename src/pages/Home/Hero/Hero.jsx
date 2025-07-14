"use client"

import { Link } from "react-router-dom"
import { Heart, Users } from "lucide-react"

import heroContent from "@/data/hero-content"
import "./hero.css"
const Hero = () => {
   const item = heroContent[0]

   return (
      <div className="hero relative overflow-hidden ">
         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))] dark:bg-grid-slate-700/25"></div>

         <div className="relative h-full w-full py-16 md:py-24 lg:py-12">
            <div className="main-container">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="space-y-8 max-w-2xl">
                     <div
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        data-aos="fade-down"
                        data-aos-duration="800"
                     >
                        <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        <span>Save Lives Today</span>
                     </div>

                     <h1
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
                     >
                        {item.title}
                     </h1>

                     <p
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
                     >
                        {item.description}
                     </p>

                     <div
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="400"
                     >
                        <Link
                           to="/auth/register"
                           className="inline-flex h-12 items-center justify-center rounded-lg bg-red-600 px-6 text-base font-medium text-white shadow-lg transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 group"
                        >
                           <Heart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                           Register now
                        </Link>
                        <Link
                           to="/find-donor"
                           className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-base font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-offset-slate-800 group"
                        >
                           <Users className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                           Find Donor
                        </Link>
                     </div>

                     <div
                        className="flex items-center gap-4 pt-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="600"
                     >
                        <div className="flex -space-x-2">
                           {[1, 2, 3, 4].map((i) => (
                              <div
                                 key={i}
                                 className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-800 overflow-hidden"
                              >
                                 <img
                                    src={`https://api.dicebear.com/7.x/personas/svg?seed=donor${i}`}
                                    alt={`Donor ${i}`}
                                    className="h-full w-full object-cover"
                                 />
                              </div>
                           ))}
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-400">
                           <span className="font-semibold text-slate-900 dark:text-white">2,500+</span> donors have joined
                        </p>
                     </div>
                  </div>

                  <div
                     className="relative flex items-center justify-center"
                     data-aos="zoom-in"
                     data-aos-duration="1200"
                  >
                     <div className="absolute inset-0 bg-gradient-radial from-red-100 to-transparent dark:from-red-900/20 dark:to-transparent opacity-70 rounded-full blur-3xl"></div>
                     <div className="relative p-4">
                        <img
                           src={item.image || "/placeholder.svg?height=500&width=500"}
                           alt={item.title}
                           className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-2xl transition-all duration-700 hover:scale-105"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
