import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldAlert, CheckCircle2, MessageSquare, Send } from "lucide-react"
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
            <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
               <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                     <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="font-extrabold text-slate-900 text-sm">Facing an Immediate Life-Threatening Emergency?</p>
                     <p className="text-xs text-slate-600">Don't wait for a form reply. Call our priority emergency hotline immediately.</p>
                  </div>
               </div>
               <a
                  href="tel:01540042699"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
               >
                  <Phone className="w-4 h-4" />
                  Call: 01540042699
               </a>
            </div>
         </div>

         {/* Main Contact Grid */}
         <section className="py-12 pb-24">
            <div className="main-container">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left Column: Interactive Form */}
                  <div className="lg:col-span-7">
                     <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
                        <div className="mb-8 space-y-2">
                           <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                              Send Us a Message
                           </h2>
                           <p className="text-slate-500 text-sm">
                              Fill out the form below and a representative will reply within a few hours.
                           </p>
                        </div>

                        {/* Inquiry Type Radio / Pill Selector */}
                        <div className="mb-6 space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Inquiry Category
                           </label>
                           <div className="grid grid-cols-3 gap-2">
                              {[
                                 { id: "general", label: "General" },
                                 { id: "urgent", label: "Urgent Need" },
                                 { id: "partner", label: "Drive / Partner" },
                              ].map((type) => (
                                 <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setInquiryType(type.id)}
                                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                       inquiryType === type.id
                                          ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                    }`}
                                 >
                                    {type.label}
                                 </button>
                              ))}
                           </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                 <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase">
                                    Your Full Name *
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
                                    Email Address *
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
                                    placeholder="Inquiry Topic"
                                    className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium focus-visible:ring-rose-500"
                                 />
                              </div>
                           </div>

                           <div className="space-y-1.5">
                              <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase">
                                 Detailed Message *
                              </label>
                              <Textarea
                                 id="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 placeholder="Please describe how we can assist you..."
                                 rows={5}
                                 className="bg-slate-50 border-slate-200 rounded-2xl font-medium focus-visible:ring-rose-500 resize-none"
                                 required
                              />
                           </div>

                           <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-200 transition-all text-base"
                           >
                              {isSubmitting ? "Sending Message..." : "Send Message"}
                              <Send className="ml-2 h-4 w-4" />
                           </Button>
                        </form>
                     </div>
                  </div>

                  {/* Right Column: Contact Cards */}
                  <div className="lg:col-span-5 space-y-6">
                     <div className="p-8 rounded-[2.5rem] bg-slate-50/80 border border-slate-100 space-y-6">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                           Direct Contact Channels
                        </h3>

                        <div className="space-y-4">
                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs">
                              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <Phone className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Emergency Hotlines</p>
                                 <a href="tel:01540042699" className="text-rose-600 font-bold text-sm mt-0.5 hover:underline block">01540042699</a>
                                 <p className="text-slate-500 text-xs">24/7 Dedicated Emergency Helpline</p>
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs">
                              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <Mail className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Email Address</p>
                                 <p className="text-slate-700 font-medium text-sm mt-0.5">help@daretodonate.org</p>
                                 <p className="text-slate-500 text-xs">drives@daretodonate.org</p>
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs">
                              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Main Coordination Office</p>
                                 <p className="text-slate-600 text-xs mt-0.5">
                                    House 42, Road 11, Dhanmondi, Dhaka 1209, Bangladesh
                                 </p>
                              </div>
                           </div>

                           <div className="p-4 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-xs">
                              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                 <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-extrabold text-slate-900 text-sm">Support Availability</p>
                                 <p className="text-slate-600 text-xs mt-0.5">
                                    Emergency Blood Coordination: <strong className="text-rose-600">24 Hours / 7 Days</strong>
                                 </p>
                                 <p className="text-slate-500 text-xs">Administrative Support: 9:00 AM – 7:00 PM</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}
