import { Heart, Droplet, Phone, Mail, MapPin, ShieldCheck, ArrowRight, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"

const Footer = () => {
   const [email, setEmail] = useState("")

   const handleSubscribe = (e) => {
      e.preventDefault()
      if (!email || !email.includes("@")) {
         toast.error("Please enter a valid email address")
         return
      }
      toast.success("Thank you for joining our lifesaving community newsletter!")
      setEmail("")
   }

   return (
      <footer className="bg-slate-950 text-slate-300 relative overflow-hidden border-t border-slate-900">
         {/* Decorative subtle ambient lights */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

         <div className="main-container relative z-10 pt-16 pb-12">
            {/* Top Newsletter Card */}
            <div className="relative rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border border-rose-500/20 p-8 sm:p-10 mb-16 shadow-2xl backdrop-blur-xl">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-2">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                        <Droplet className="w-3 h-3 fill-rose-400" />
                        Lifesaver Community
                     </div>
                     <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Never Miss an Emergency Blood Drive
                     </h3>
                     <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                        Subscribe to receive real-time notifications when your blood type is critically needed in your locality.
                     </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
                     <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500 h-12 rounded-xl focus-visible:ring-rose-500"
                     />
                     <Button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold h-12 px-6 rounded-xl shrink-0 shadow-lg shadow-rose-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                     >
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                     </Button>
                  </form>
               </div>
            </div>

            {/* Quick Blood Group Compatibility Guide Pill Bar */}
            <div className="mb-14 p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                     <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <ShieldCheck className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-white font-bold text-sm">Universal Blood Compatibility</p>
                        <p className="text-slate-400 text-xs">Quick donor reference guide</p>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                     <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                        <strong className="text-rose-400 font-extrabold">O-</strong> : Universal Red Cell Donor
                     </span>
                     <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                        <strong className="text-rose-400 font-extrabold">AB+</strong> : Universal Plasma Donor
                     </span>
                     <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                        <strong className="text-emerald-400 font-extrabold">1 Pint</strong> : Saves Up To 3 Lives
                     </span>
                  </div>
               </div>
            </div>

            {/* Main Links Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
               {/* Col 1: About Platform */}
               <div className="lg:col-span-2 space-y-4">
                  <NavLink to="/" className="inline-flex items-center gap-2.5">
                     <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-md shadow-rose-900/50">
                        <Droplet className="w-5 h-5 fill-white" />
                     </div>
                     <div>
                        <p className="font-extrabold text-xl text-white tracking-tight leading-none">
                           Dare<span className="text-rose-500">To</span>Donate
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                           Free Voluntary Platform
                        </p>
                     </div>
                  </NavLink>

                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                     A volunteer-driven, non-profit blood matching network dedicated to eliminating preventable deaths caused by blood shortage. 100% voluntary, direct, and completely free.
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Platform Active
                     </span>
                     <span>Verified Community Donors</span>
                  </div>
               </div>

               {/* Col 2: Quick Links */}
               <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm tracking-wide uppercase">Quick Links</h4>
                  <ul className="space-y-2.5 text-sm">
                     <li>
                        <Link to="/" className="hover:text-rose-400 transition-colors">Home Page</Link>
                     </li>
                     <li>
                        <Link to="/find-donor" className="hover:text-rose-400 transition-colors">Find a Donor</Link>
                     </li>
                     <li>
                        <Link to="/auth/register" className="hover:text-rose-400 transition-colors">Register as Donor</Link>
                     </li>
                     <li>
                        <Link to="/about" className="hover:text-rose-400 transition-colors">About Mission</Link>
                     </li>
                     <li>
                        <Link to="/contact-us" className="hover:text-rose-400 transition-colors">Contact Support</Link>
                     </li>
                  </ul>
               </div>

               {/* Col 3: Donor Guidelines */}
               <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm tracking-wide uppercase">Guidelines</h4>
                  <ul className="space-y-2.5 text-sm">
                     <li>
                        <Link to="/about" className="hover:text-rose-400 transition-colors">Eligibility Requirements</Link>
                     </li>
                     <li>
                        <Link to="/about" className="hover:text-rose-400 transition-colors">Pre-Donation Tips</Link>
                     </li>
                     <li>
                        <Link to="/about" className="hover:text-rose-400 transition-colors">Post-Donation Recovery</Link>
                     </li>
                     <li>
                        <Link to="/find-donor" className="hover:text-rose-400 transition-colors">Emergency Match Process</Link>
                     </li>
                     <li>
                        <Link to="/contact-us" className="hover:text-rose-400 transition-colors">Hospital Coordination</Link>
                     </li>
                  </ul>
               </div>

               {/* Col 4: 24/7 Helpline */}
               <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm tracking-wide uppercase">Emergency Helpline</h4>
                  <ul className="space-y-3 text-sm">
                     <li className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                           <p className="text-white font-bold text-sm">+880 (1800) DONATE</p>
                           <p className="text-xs text-slate-400">24/7 Toll-Free Emergency Hotline</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-2.5">
                        <Mail className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                           <p className="text-white font-bold text-sm">emergency@daretodonate.org</p>
                           <p className="text-xs text-slate-400">Response within 15 minutes</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                           <p className="text-slate-300 text-xs">Nationwide Donor Coverage, All 64 Districts</p>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Bottom Bar: Copyright & Disclaimer */}
            <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
               <p>
                  &copy; {new Date().getFullYear()} Dare To Donate. All rights reserved. Made with{" "}
                  <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for humanity.
               </p>

               <div className="flex flex-wrap gap-6 text-xs">
                  <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link to="/about" className="hover:text-white transition-colors">Terms of Voluntary Service</Link>
                  <Link to="/contact-us" className="hover:text-white transition-colors">Safety Guidelines</Link>
                  <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-rose-400 hover:text-rose-300">
                     Back to Top ↑
                  </a>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
