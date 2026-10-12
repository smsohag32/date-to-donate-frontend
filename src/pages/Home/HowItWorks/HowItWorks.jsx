import { motion } from "framer-motion"
import { Search, HeartHandshake, PhoneCall, CheckCircle2, UserPlus, Heart } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const donorSteps = [
   {
      number: "01",
      icon: <UserPlus className="w-7 h-7 text-rose-600" />,
      title: "Register in 60 Seconds",
      description: "Sign up with your blood group, phone number, and location. Your details remain secure and private.",
   },
   {
      number: "02",
      icon: <HeartHandshake className="w-7 h-7 text-rose-600" />,
      title: "Receive Emergency Alert",
      description: "Get notified when a patient or hospital nearby urgently matches your blood group.",
   },
   {
      number: "03",
      icon: <Heart className="w-7 h-7 text-rose-600 fill-rose-600" />,
      title: "Donate & Save Up to 3 Lives",
      description: "Visit the certified donation center or hospital, donate safely, and track your lifesaving journey.",
   },
]

const HowItWorks = () => {
   return (
      <section className="py-24 bg-slate-50/70 relative overflow-hidden">
         <div className="main-container relative z-10">
            <SectionHeader
               badge="Simple 3-Step Process"
               title="How It Works for"
               highlight="Lifesavers & Recipients"
               subtitle="We eliminated delays and middlemen. Direct peer-to-peer voluntary connection in crucial emergency moments."
            />

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               {donorSteps.map((step, idx) => (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: idx * 0.15 }}
                     whileHover={{ y: -8 }}
                     className="relative bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-rose-100/30 transition-all duration-300 group"
                  >
                     {/* Step Number Background */}
                     <span className="absolute top-6 right-8 text-5xl font-black text-slate-100 group-hover:text-rose-100/60 transition-colors pointer-events-none">
                        {step.number}
                     </span>

                     <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                        <span className="group-hover:brightness-0 group-hover:invert transition-all">
                           {step.icon}
                        </span>
                     </div>

                     <h3 className="text-xl font-black text-slate-900 tracking-tight mb-3">
                        {step.title}
                     </h3>

                     <p className="text-slate-500 text-sm leading-relaxed">
                        {step.description}
                     </p>
                  </motion.div>
               ))}
            </div>

            {/* Quick Banner Action */}
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 to-rose-950 p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
               <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black">Are you ready to be a hero?</h4>
                  <p className="text-slate-300 text-sm">Join over 5,200 voluntary donors already on the platform.</p>
               </div>
               <div className="flex items-center gap-3 shrink-0">
                  <Link to="/auth/register">
                     <Button className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-rose-900/30">
                        Join as Donor Now
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default HowItWorks
