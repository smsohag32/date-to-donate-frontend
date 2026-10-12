import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Heart, CheckCircle2, ArrowRight, ShieldCheck, Zap, Users, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import SectionHeader from "@/components/shared/SectionHeader"

const bloodCompatibilities = {
   "O-": {
      give: ["All Blood Types (O-, O+, A-, A+, B-, B+, AB-, AB+)"],
      receive: ["O-"],
      badge: "Universal Red Cell Donor",
      description: "Vital for trauma patients and emergency transfusions when blood type is unknown.",
      rarity: "Approx 7% of population",
   },
   "O+": {
      give: ["O+", "A+", "B+", "AB+"],
      receive: ["O+", "O-"],
      badge: "Most Common Blood Type",
      description: "Highest demand by hospitals every single day.",
      rarity: "Approx 38% of population",
   },
   "A-": {
      give: ["A-", "A+", "AB-", "AB+"],
      receive: ["A-", "O-"],
      badge: "Crucial Donor",
      description: "Critical for surgeries and patients with rare antibody profiles.",
      rarity: "Approx 6% of population",
   },
   "A+": {
      give: ["A+", "AB+"],
      receive: ["A+", "A-", "O+", "O-"],
      badge: "High Hospital Demand",
      description: "Frequently utilized for oncology and routine surgeries.",
      rarity: "Approx 34% of population",
   },
   "B-": {
      give: ["B-", "B+", "AB-", "AB+"],
      receive: ["B-", "O-"],
      badge: "Rare Blood Group",
      description: "Extremely difficult to source during late-night emergency requests.",
      rarity: "Approx 2% of population",
   },
   "B+": {
      give: ["B+", "AB+"],
      receive: ["B+", "B-", "O+", "O-"],
      badge: "Valuable Donor",
      description: "Frequently requested in emergency and trauma care.",
      rarity: "Approx 9% of population",
   },
   "AB-": {
      give: ["AB-", "AB+"],
      receive: ["AB-", "A-", "B-", "O-"],
      badge: "Rarest Blood Type",
      description: "Universal plasma donor for complex ICU emergency procedures.",
      rarity: "Approx 1% of population",
   },
   "AB+": {
      give: ["AB+"],
      receive: ["All Blood Types (Universal Recipient)"],
      badge: "Universal Recipient",
      description: "Can safely receive red blood cells from any blood donor.",
      rarity: "Approx 3% of population",
   },
}

const bloodTypes = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]

const keyFeatures = [
   {
      icon: <Zap className="w-6 h-6 text-rose-500" />,
      title: "Direct & Instant Connect",
      description: "Call or message voluntary donors near you directly without bureaucratic delays.",
   },
   {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: "100% Free & Verified",
      description: "Zero fees, zero middlemen. Completely voluntary community for saving lives.",
   },
   {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: "64 Districts Network",
      description: "Locate compatible donors across all divisions and districts in Bangladesh.",
   },
   {
      icon: <Activity className="w-6 h-6 text-rose-500" />,
      title: "Real-time Availability",
      description: "Donors update their availability after donating to ensure only active donors are called.",
   },
]

const Featured = () => {
   const [selectedType, setSelectedType] = useState("O-")
   const currentData = bloodCompatibilities[selectedType]

   return (
      <section className="py-20 bg-white border-y border-slate-100">
         <div className="main-container">
            {/* Header */}
            <SectionHeader
               badge="Smart Compatibility Matrix"
               title="Know Your Match,"
               highlight="Save Three Lives"
               subtitle="Every blood type has superpowers. Click your blood group below to see who you can donate to and receive blood from."
            />

            {/* Interactive Blood Selector Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
               {bloodTypes.map((type) => {
                  const isSelected = selectedType === type
                  return (
                     <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-5 py-3 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                           isSelected
                              ? "bg-rose-600 text-white shadow-lg shadow-rose-200 scale-105"
                              : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                        }`}
                     >
                        <Droplet className={`w-4 h-4 ${isSelected ? "fill-white text-white" : "text-rose-500"}`} />
                        <span>{type}</span>
                     </button>
                  )
               })}
            </div>

            {/* Selected Blood Type Card */}
            <AnimatePresence mode="wait">
               <motion.div
                  key={selectedType}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto bg-gradient-to-br from-rose-50/50 via-white to-slate-50 p-6 sm:p-10 rounded-3xl border border-rose-100 shadow-xl shadow-rose-100/30 mb-20"
               >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-rose-200">
                           {selectedType}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h3 className="text-2xl font-black text-slate-900">{selectedType} Blood Type</h3>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                 {currentData.badge}
                              </span>
                           </div>
                           <p className="text-slate-500 text-sm mt-0.5">{currentData.rarity}</p>
                        </div>
                     </div>

                     <Link to="/find-donor">
                        <Button className="bg-slate-900 hover:bg-rose-600 text-white font-bold rounded-xl h-11 px-5 transition-all text-xs sm:text-sm">
                           Search {selectedType} Donors →
                        </Button>
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                     {/* Can Give Blood To */}
                     <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm uppercase tracking-wider">
                           <Heart className="w-4 h-4 fill-rose-600" />
                           Can Donate Red Blood Cells To:
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                           {currentData.give.map((item, idx) => (
                              <span
                                 key={idx}
                                 className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 font-bold text-sm"
                              >
                                 {item}
                              </span>
                           ))}
                        </div>
                     </div>

                     {/* Can Receive Blood From */}
                     <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm uppercase tracking-wider">
                           <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                           Can Receive Red Blood Cells From:
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                           {currentData.receive.map((item, idx) => (
                              <span
                                 key={idx}
                                 className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-sm"
                              >
                                 {item}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>

                  <p className="mt-6 text-sm text-slate-600 bg-rose-50/60 p-4 rounded-xl border border-rose-100/80 leading-relaxed">
                     💡 <strong>Clinical Insight:</strong> {currentData.description}
                  </p>
               </motion.div>
            </AnimatePresence>

            {/* 4 Feature Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {keyFeatures.map((feat, index) => (
                  <motion.div
                     key={index}
                     whileHover={{ y: -6 }}
                     transition={{ duration: 0.3 }}
                     className="p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300"
                  >
                     <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-5">
                        {feat.icon}
                     </div>
                     <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                        {feat.title}
                     </h4>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        {feat.description}
                     </p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Featured
