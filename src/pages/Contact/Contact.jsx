import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
   MapPin,
   Phone,
   Mail,
   Clock,
   ShieldAlert,
   CheckCircle2,
   Send,
   HelpCircle,
   Flame,
   Users2,
   MessageSquareText,
   Check,
   Sparkles,
} from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function Contact() {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [inquiryType, setInquiryType] = useState("general")
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
   })

   const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!formData.name || !formData.email || !formData.message) {
         toast.error("Please fill in your name, email, and message.")
         return
      }

      setIsSubmitting(true)
      setTimeout(() => {
         setIsSubmitting(false)
         toast.success("Message received! Our team will respond shortly.")
         setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
         })
      }, 1000)
   }

   const inquiryOptions = [
      { id: "general", label: "General Query", icon: MessageSquareText },
      { id: "urgent", label: "Urgent Need", icon: Flame },
      { id: "partner", label: "Drive / Partner", icon: Users2 },
   ]

   const faqs = [
      {
         q: "How fast do you respond to urgent requests?",
         a: "Emergency calls are answered 24/7 immediately. Online forms for urgent cases are reviewed within 15–30 minutes.",
      },
      {
         q: "Is there any fee or commission for donors?",
         a: "None. Dare To Donate is 100% voluntary and non-commercial. Donating and requesting blood is always free.",
      },
      {
         q: "Can you organize a blood drive at our college or office?",
         a: "Yes! Choose 'Drive / Partner' above and our field team will reach out to schedule an on-site campaign.",
      },
   ]

   return (
      <div className="min-h-screen bg-white">
         {/* Top Hero Banner */}
         <section className="relative py-20 lg:py-24 bg-gradient-to-b from-rose-50/60 via-white to-slate-50/30 overflow-hidden border-b border-slate-100">
            <div className="main-container text-center max-w-3xl mx-auto">
               <SectionHeader
                  badge="Always Here For You"
                  title="Connect With Our"
                  highlight="Support Network"
                  subtitle="Whether you need emergency blood assistance, want to organize a donation drive, or have general questions, our team is accessible 24/7."
               />
            </div>
         </section>

         {/* Emergency Notification Alert Bar */}
         <div className="main-container py-8">
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-500 to-red-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-rose-200">
               <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0">
                     <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                     <p className="font-extrabold text-white text-sm sm:text-base">Facing an Immediate Life-Threatening Emergency?</p>
                     <p className="text-xs text-rose-100">Don't wait for a web form reply. Call our emergency response desk directly.</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <a
                     href="tel:01540042699"
                     className="px-5 py-2.5 rounded-xl bg-white text-rose-600 hover:bg-rose-50 font-black text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
                  >
                     <Phone className="w-4 h-4" />
                     Hotline: 01540042699
                  </a>
               </div>
            </div>
         </div>

         {/* Main Contact Grid */}
         <section className="py-8 pb-24">
            <div className="main-container">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Column: Interactive Form */}
                  <div className="lg:col-span-7">
                     <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40">
                        <div className="mb-8 space-y-2">
                           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5" />
                              Direct Messaging
                           </div>
                           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                              Send Us a Message
                           </h2>
                           <p className="text-slate-500 text-sm">
                              Fill out the form below and an emergency coordinator or volunteer representative will get in touch with you.
                           </p>
                        </div>

                        {/* Inquiry Type Radio / Pill Selector */}
                        <div className="mb-6 space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Select Inquiry Category
                           </label>
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {inquiryOptions.map((type) => {
                                 const Icon = type.icon
                                 const isActive = inquiryType === type.id
                                 return (
                                    <button
                                       key={type.id}
                                       type="button"
                                       onClick={() => setInquiryType(type.id)}
                                       className={`py-3 px-3.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                          isActive
                                             ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                                             : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                       }`}
                                    >
                                       <Icon className="w-4 h-4" />
                                       <span>{type.label}</span>
                                    </button>
                                 )
                              })}
                           </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                 <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase">
                                    Your Full Name <span className="text-rose-500">*</span>
                                 </label>
                                 <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Tanvir Hasan"
                                    className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus-visible:ring-rose-500"
                                    required
                                 />
                              </div>

                              <div className="space-y-1.5">
                                 <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase">
                                    Email Address <span className="text-rose-500">*</span>
                                 </label>
                                 <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tanvir@example.com"
                                    className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus-visible:ring-rose-500"
                                    required
                                 />
                              </div>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                 <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase">
                                    Phone Number
                                 </label>
                                 <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+880 1XXXXXXXXX"
                                    className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus-visible:ring-rose-500"
                                 />
                              </div>

                              <div className="space-y-1.5">
                                 <label htmlFor="subject" className="text-xs font-bold text-slate-700 uppercase">
                                    Subject
                                 </label>
                                 <Input
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="e.g. Need urgent O+ blood in Dhaka"
                                    className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus-visible:ring-rose-500"
                                 />
                              </div>
                           </div>

                           <div className="space-y-1.5">
                              <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase">
                                 Detailed Message <span className="text-rose-500">*</span>
                              </label>
                              <Textarea
                                 id="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 placeholder="Please describe how we can assist you, hospital name, units needed..."
                                 rows={5}
                                 className="bg-slate-50 border-slate-200 rounded-2xl font-medium focus-visible:ring-rose-500 resize-none"
                                 required
                              />
                           </div>

                           <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all text-base cursor-pointer"
                           >
                              {isSubmitting ? "Sending Message..." : "Send Message"}
                              <Send className="ml-2 h-4 w-4" />
                           </Button>
                        </form>
                     </div>
                  </div>

                  {/* Right Column: Contact Channels & Quick FAQ */}
                  <div className="lg:col-span-5 space-y-6">
                     <div className="p-8 rounded-[2.5rem] bg-slate-50/90 border border-slate-200/80 space-y-6">
                        <div className="flex items-center justify-between">
                           <h3 className="text-xl font-black text-slate-900 tracking-tight">
                              Direct Channels
                           </h3>
                           <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              Active Online
                           </span>
                        </div>

                        <div className="space-y-3.5">
                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs hover:border-rose-100 transition-colors">
                              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <Phone className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Emergency Hotlines</p>
                                 <a href="tel:01540042699" className="text-rose-600 font-bold text-sm mt-0.5 hover:underline block">01540042699</a>
                                 <p className="text-slate-500 text-xs mt-0.5">24/7 Dedicated Emergency Helpline</p>
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs hover:border-rose-100 transition-colors">
                              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <Mail className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Email Coordination</p>
                                 <p className="text-slate-700 font-medium text-sm mt-0.5">help@daretodonate.org</p>
                                 <p className="text-slate-500 text-xs mt-0.5">drives@daretodonate.org</p>
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs hover:border-rose-100 transition-colors">
                              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Headquarters</p>
                                 <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                                    House 42, Road 11, Dhanmondi, Dhaka 1209, Bangladesh
                                 </p>
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs hover:border-rose-100 transition-colors">
                              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Operation Hours</p>
                                 <p className="text-slate-600 text-xs mt-0.5">
                                    Blood Matches: <strong className="text-rose-600">24/7 Continuous</strong>
                                 </p>
                                 <p className="text-slate-500 text-xs mt-0.5">Admin & Logistics: 9:00 AM – 7:00 PM</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Fast Answers / FAQ Card */}
                     <div className="p-6 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-md shadow-slate-100 space-y-4">
                        <div className="flex items-center gap-2">
                           <HelpCircle className="w-5 h-5 text-rose-600" />
                           <h4 className="font-black text-slate-900 text-base">Frequently Asked Questions</h4>
                        </div>
                        <div className="space-y-3">
                           {faqs.map((faq, i) => (
                              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-left">
                                 <p className="text-xs font-bold text-slate-900 mb-1">{faq.q}</p>
                                 <p className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}
