"use client"

import { Link } from "react-router-dom"
import { Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

import heroContent from "@/data/hero-content"
import "./hero.css"

const Hero = () => {
   const item = heroContent[0]

   return (
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
         {/* Premium Background Elements */}
         <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-50 blur-[120px] opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-rose-100 blur-[100px] opacity-40"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
         </div>

         <div className="main-container relative z-10 py-20 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
               {/* Content Section */}
               <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
                  <div 
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-semibold text-sm shadow-sm"
                     data-aos="fade-down"
                  >
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                     </span>
                     JOIN THE MISSION
                  </div>

                  <div className="space-y-6">
                     <h1 
                        className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
                        data-aos="fade-up"
                     >
                        {item.title.split('—').map((part, index) => (
                           <span key={index} className={index === 1 ? "text-rose-600 block mt-2" : ""}>
                              {part} {index === 0 && "—"}
                           </span>
                        ))}
                     </h1>
                     <p 
                        className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
                        data-aos="fade-up"
                        data-aos-delay="100"
                     >
                        Every drop counts. By donating blood, you're not just giving a resource — you're offering hope, healing, and a second chance at life.
                     </p>
                  </div>

                  <div 
                     className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                     data-aos="fade-up"
                     data-aos-delay="200"
                  >
                     <Link to="/auth/register">
                        <Button className="h-14 px-8 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-rose-200 transition-all hover:scale-105 active:scale-95 group">
                           <Heart className="mr-2 h-6 w-6 group-hover:fill-current" />
                           Become a Donor
                        </Button>
                     </Link>
                     <Link to="/find-donor">
                        <Button variant="outline" className="h-14 px-8 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95">
                           <Users className="mr-2 h-6 w-6" />
                           Find a Donor
                        </Button>
                     </Link>
                  </div>

                  {/* Trust Badge / User Avatars */}
                  <div 
                     className="flex items-center justify-center lg:justify-start gap-4 pt-6"
                     data-aos="fade-up"
                     data-aos-delay="300"
                  >
                     <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                           <div key={i} className="w-12 h-12 rounded-full border-4 border-white shadow-sm overflow-hidden bg-slate-100">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                           </div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                           +2.5k
                        </div>
                     </div>
                     <div className="text-left">
                        <p className="text-slate-900 font-bold leading-tight">Join 2,500+ Donors</p>
                        <p className="text-slate-500 text-sm font-medium italic">"Safe, quick, and impactful"</p>
                     </div>
                  </div>
               </div>

               {/* Image Section */}
               <div className="lg:col-span-5 relative order-1 lg:order-2" data-aos="zoom-in" data-aos-duration="1500">
                  <div className="relative z-10 animate-float">
                     <div className="absolute inset-0 bg-rose-200 rounded-[3rem] rotate-6 blur-2xl opacity-20 -z-10 group-hover:rotate-12 transition-transform duration-700"></div>
                     <img 
                        src={item.image} 
                        alt="Hero" 
                        className="w-full max-w-[500px] mx-auto drop-shadow-[0_20px_50px_rgba(255,33,86,0.2)] rounded-[2rem]"
                     />
                  </div>
                  
                  {/* Floating Stats or Badges */}
                  <div className="absolute -bottom-6 -left-6 lg:left-0 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 animate-bounce-slow z-20 hidden sm:block">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                           <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase">Emergency</p>
                           <p className="text-lg font-extrabold text-slate-800">24/7 Support</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Hero
