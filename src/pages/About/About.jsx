import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
   Heart,
   Users,
   Droplet,
   ArrowRight,
   ShieldCheck,
   Clock,
   Award,
   CheckCircle2,
   Sparkles,
   PhoneCall,
   MapPin,
   Star,
} from "lucide-react"
import bloodDonateImage from "@/assets/about/blood-donate.webp"
import bloodDonateImage2 from "@/assets/about/blood-donate2.webp"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import SectionHeader from "@/components/shared/SectionHeader"
import AppBanner from "../Home/Banner/AppBanner"
import { motion } from "framer-motion"

export default function About() {
   const [eligibilityAnswers, setEligibilityAnswers] = useState({
      age: true,
      weight: true,
      health: true,
      recent: true,
   })

   const testimonials = [
      {
         id: 1,
         name: "Rahul Ahmed",
         role: "Regular O+ Donor (14 Donations)",
         location: "Dhaka",
         testimonial:
            "I've been donating blood for 5 years through Dare To Donate. The feeling of knowing my donation directly helped someone during cardiac surgery is truly indescribable.",
      },
      {
         id: 2,
         name: "Dr. Fatima Khan",
         role: "Emergency Care Physician",
         location: "Chittagong",
         testimonial:
            "Dare To Donate has significantly shortened the frantic search for rare blood types in our emergency department. It genuinely bridges the gap between life and death.",
      },
      {
         id: 3,
         name: "Arif Hossain",
         role: "Blood Recipient & Lifesaver",
         location: "Sylhet",
         testimonial:
            "After a road accident, I required 4 bags of B+ blood. Anonymous voluntary donors saved my life. Today, I am fully recovered and an active donor myself.",
      },
      {
         id: 4,
         name: "Priya Sharma",
         role: "University Youth Volunteer",
         location: "Rajshahi",
         testimonial:
            "Organizing campus donation drives with this platform has empowered hundreds of first-time donors to conquer their fears and make regular giving a habit.",
      },
      {
         id: 5,
         name: "Mohammed Ali",
         role: "Community Organizer",
         location: "Khulna",
         testimonial:
            "Zero commercialization, 100% voluntary compassion. That is what makes this platform trustworthy for both hospital staff and donors alike.",
      },
      {
         id: 6,
         name: "Nusrat Jahan",
         role: "Mother & Blood Recipient",
         location: "Barisal",
         testimonial:
            "During childbirth complications, timely blood matched through this community saved both me and my newborn baby girl. Forever grateful.",
      },
   ]

   const missionPoints = [
      {
         icon: <Heart className="h-7 w-7 text-rose-600" />,
         title: "Save Precious Lives",
         desc: "One single donation can be separated into red cells, platelets, and plasma, helping up to three distinct patients in need.",
      },
      {
         icon: <Users className="h-7 w-7 text-rose-600" />,
         title: "Zero Middlemen Network",
         desc: "We connect donors and patients directly to prevent commercial exploitation and provide immediate emergency access.",
      },
      {
         icon: <Droplet className="h-7 w-7 text-rose-600" />,
         title: "Cultivate Lifelong Giving",
         desc: "We educate youth and communities to eliminate stigma, dispel myths, and make regular donation a celebrated civic habit.",
      },
   ]

   return (
      <div className="min-h-screen bg-white overflow-hidden">
         {/* Hero Section */}
         <section className="relative py-20 lg:py-28 bg-gradient-to-b from-rose-50/60 via-white to-slate-50/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[140px] pointer-events-none" />
            <div className="main-container relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                     <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-bold text-xs uppercase tracking-wider">
                        <Droplet className="w-3.5 h-3.5 fill-rose-500" />
                        Our Lifesaving Mission
                     </div>

                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        Connecting Hope,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600">
                           One Donation
                        </span>{" "}
                        at a Time
                     </h1>

                     <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                        Dare To Donate was founded with a singular conviction: no human life should ever be lost due to the inability to locate a compatible blood donor in time.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                        <Link to="/auth/register">
                           <Button className="h-14 px-8 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all hover:scale-[1.02]">
                              Join Our Movement <ArrowRight className="ml-2 h-5 w-5" />
                           </Button>
                        </Link>
                        <Link to="/find-donor">
                           <Button
                              variant="outline"
                              className="h-14 px-8 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50"
                           >
                              Find a Donor
                           </Button>
                        </Link>
                     </div>

                     {/* Stats bar */}
                     <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0">
                        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                           <p className="text-2xl sm:text-3xl font-black text-rose-600">10k+</p>
                           <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">Lives Saved</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                           <p className="text-2xl sm:text-3xl font-black text-rose-600">5.2k+</p>
                           <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">Active Donors</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                           <p className="text-2xl sm:text-3xl font-black text-rose-600">64</p>
                           <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">Districts</p>
                        </div>
                     </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                     <div className="relative mx-auto max-w-[460px]">
                        <div className="absolute inset-0 bg-rose-200/50 rounded-[3rem] blur-2xl transform rotate-3" />
                        <img
                           src={bloodDonateImage || "/placeholder.svg"}
                           alt="Blood Donation Drive"
                           className="relative z-10 w-full h-auto rounded-[2.5rem] shadow-2xl border-4 border-white object-cover"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Mission Pillars */}
         <section className="py-24 bg-white">
            <div className="main-container">
               <SectionHeader
                  badge="Core Pillars"
                  title="Why We"
                  highlight="Dare To Care"
                  subtitle="Every day in Bangladesh, hospitals and emergency wards face acute blood shortages. Here is how our community takes action."
               />

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {missionPoints.map((item, idx) => (
                     <motion.div
                        key={idx}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 rounded-[2.5rem] bg-slate-50/80 hover:bg-white border border-slate-100 hover:border-rose-100 hover:shadow-2xl hover:shadow-rose-100/30 transition-all duration-300"
                     >
                        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6">
                           {item.icon}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                           {item.title}
                        </h3>
                        <p className="text-slate-500 text-base leading-relaxed">
                           {item.desc}
                        </p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Interactive Eligibility Checklist */}
         <section className="py-24 bg-slate-50/70 border-y border-slate-100">
            <div className="main-container">
               <SectionHeader
                  badge="Donor Readiness"
                  title="Can You Donate"
                  highlight="Blood Today?"
                  subtitle="Most healthy adults are eligible to donate. Check your basic readiness in seconds."
               />

               <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                  <div className="space-y-3">
                     {[
                        {
                           id: "age",
                           title: "Age Requirement (18–60 Years)",
                           desc: "You are between 18 and 60 years old (up to 65 for regular, frequent donors).",
                        },
                        {
                           id: "weight",
                           title: "Minimum Body Weight",
                           desc: "You weigh at least 45 kg (99 lbs) for female donors and 50 kg for male donors.",
                        },
                        {
                           id: "recent",
                           title: "Donation Recovery Interval",
                           desc: "At least 90 days (3 months for males, 4 months for females) have elapsed since your last donation.",
                        },
                        {
                           id: "health",
                           title: "General Physical Health",
                           desc: "You are feeling well, well-hydrated, and not currently suffering from acute fever or infection.",
                        },
                     ].map((check) => {
                        const isChecked = eligibilityAnswers[check.id]
                        return (
                           <button
                              key={check.id}
                              type="button"
                              onClick={() =>
                                 setEligibilityAnswers((prev) => ({
                                    ...prev,
                                    [check.id]: !prev[check.id],
                                 }))
                              }
                              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                                 isChecked
                                    ? "bg-emerald-50/70 border-emerald-200 shadow-xs"
                                    : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/70"
                              }`}
                           >
                              <div
                                 className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isChecked
                                       ? "bg-emerald-500 text-white"
                                       : "bg-white border-2 border-slate-300 text-transparent"
                                 }`}
                              >
                                 <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-bold text-slate-900 text-sm sm:text-base">
                                    {check.title}
                                 </p>
                                 <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                                    {check.desc}
                                 </p>
                              </div>
                           </button>
                        )
                     })}
                  </div>

                  {/* Dynamic Eligibility Feedback */}
                  {Object.values(eligibilityAnswers).every(Boolean) ? (
                     <div className="p-4 rounded-2xl bg-emerald-100/80 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                        <p className="text-sm font-bold">
                           🎉 Excellent! You satisfy all core health criteria to donate blood and save up to 3 lives!
                        </p>
                     </div>
                  ) : (
                     <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3">
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <p className="text-sm font-semibold">
                           {Object.values(eligibilityAnswers).filter(Boolean).length}/4 criteria confirmed. Please ensure all conditions are met before attending a blood donation session.
                        </p>
                     </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                     <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-rose-600" />
                        Take the step today
                     </p>
                     <Link to="/auth/register" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl h-12 px-6 shadow-md shadow-rose-200">
                           Register as Eligible Donor
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* Testimonials */}
         <section className="py-24 bg-white">
            <div className="main-container">
               <SectionHeader
                  badge="Community Voices"
                  title="Stories of Hope &"
                  highlight="Lifesavers"
                  subtitle="Real individuals across Bangladesh whose courage and generosity created second chances at life."
               />

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                     <motion.div
                        key={testimonial.id}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                     >
                        <Card className="h-full border border-slate-100 bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300 flex flex-col justify-between">
                           <div>
                              <div className="flex gap-1 text-amber-400 mb-5">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                                 ))}
                              </div>

                              <p className="text-slate-700 text-base leading-relaxed italic mb-6">
                                 "{testimonial.testimonial}"
                              </p>
                           </div>

                           <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                              <Avatar className="h-12 w-12 border-2 border-rose-100">
                                 <AvatarFallback className="bg-rose-600 text-white font-bold text-sm">
                                    {testimonial.name[0]}
                                 </AvatarFallback>
                              </Avatar>
                              <div>
                                 <h4 className="font-black text-slate-900 text-base">{testimonial.name}</h4>
                                 <p className="text-xs font-semibold text-rose-600">{testimonial.role}</p>
                                 <p className="text-[11px] text-slate-400">{testimonial.location}, Bangladesh</p>
                              </div>
                           </div>
                        </Card>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Call to action */}
         <section className="py-20 bg-gradient-to-r from-rose-600 to-red-600 text-white">
            <div className="main-container text-center space-y-6">
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  Be the Hero Someone is Praying For
               </h2>
               <p className="text-rose-100 text-lg max-w-2xl mx-auto">
                  Blood cannot be manufactured in a laboratory. It only comes as a gift from one human being to another.
               </p>
               <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth/register">
                     <Button className="h-14 px-8 bg-white hover:bg-slate-100 text-rose-600 font-extrabold rounded-2xl shadow-xl transition-all">
                        Register as Donor Today
                     </Button>
                  </Link>
                  <Link to="/contact-us">
                     <Button
                        variant="outline"
                        className="h-14 px-8 border-2 border-white/60 text-white hover:bg-white/10 font-bold rounded-2xl"
                     >
                        Contact Our Team
                     </Button>
                  </Link>
               </div>
            </div>
         </section>

         <AppBanner />
      </div>
   )
}
