import { useState, useEffect } from "react"
import { Menu, X, Heart, Droplet, PhoneCall, Search, Sparkles } from "lucide-react"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import Logo from "@/assets/logo/Logo"
import { motion, AnimatePresence } from "framer-motion"
import useAuth from "@/hooks/useAuth"
import UserAvatar from "../avater/UserAvatar"

const navItems = [
   { path: "/", label: "Home" },
   { path: "/find-donor", label: "Find Donor" },
   { path: "/about", label: "About Us" },
   { path: "/contact-us", label: "Contact" },
]

const Header = () => {
   const { user } = useAuth()
   const navigate = useNavigate()
   const location = useLocation()
   const [scrolled, setScrolled] = useState(false)
   const [showTopBar, setShowTopBar] = useState(true)

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 15)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   return (
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
         {/* Top Emergency & Helpline Bar */}
         <AnimatePresence>
            {showTopBar && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800"
               >
                  <div className="main-container flex items-center justify-between">
                     <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold text-[11px] border border-rose-500/30">
                           <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                           24/7 Live
                        </span>
                        <span className="text-slate-300 text-[12px] hidden sm:inline">
                           Emergency Blood Match Network across 64 Districts
                        </span>
                        <span className="text-slate-300 text-[12px] sm:hidden">
                           24/7 Emergency Blood Match Network
                        </span>
                     </div>

                     <div className="flex items-center gap-4 text-[12px]">
                        <a
                           href="tel:01540042699"
                           className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                        >
                           <PhoneCall className="w-3.5 h-3.5" />
                           <span>Hotline: 01540042699</span>
                        </a>
                        <button
                           onClick={() => setShowTopBar(false)}
                           className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors"
                           aria-label="Dismiss banner"
                        >
                           <X className="w-3.5 h-3.5" />
                        </button>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Main Navigation Bar */}
         <nav
            className={`w-full transition-all duration-300 ${
               scrolled
                  ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-100 py-3"
                  : "bg-white/90 backdrop-blur-sm border-b border-slate-100/80 py-4"
            }`}
         >
            <div className="main-container flex items-center justify-between">
               {/* Left: Brand Logo */}
               <div className="flex items-center gap-3">
                  <MobileNav user={user} navigate={navigate} />

                  <NavLink to="/" className="flex items-center gap-2.5 group">
                     <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-all">
                        <Droplet className="w-5 h-5 fill-white" />
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
                     </div>
                     <div className="flex flex-col">
                        <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none group-hover:text-rose-600 transition-colors">
                           Dare<span className="text-rose-600">To</span>Donate
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                           Lifesaver Network
                        </span>
                     </div>
                  </NavLink>
               </div>

               {/* Center: Desktop Navigation Links */}
               <div className="hidden md:flex items-center gap-1 lg:gap-2">
                  {navItems.map((item) => (
                     <NavItem key={item.path} item={item} />
                  ))}
               </div>

               {/* Right: Actions */}
               <div className="flex items-center gap-3">
                  <Link
                     to="/find-donor"
                     className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-rose-600 hover:bg-rose-50/70 border border-slate-200 transition-all"
                  >
                     <Search className="w-3.5 h-3.5 text-rose-500" />
                     <span>Quick Search</span>
                  </Link>

                  {user ? (
                     <UserAvatar />
                  ) : (
                     <div className="flex items-center gap-2">
                        <Button
                           onClick={() => navigate("/auth/login")}
                           variant="ghost"
                           className="text-slate-700 hover:text-rose-600 hover:bg-rose-50 font-semibold text-xs md:text-sm px-3 md:px-4 rounded-xl"
                        >
                           Log in
                        </Button>
                        <Button
                           onClick={() => navigate("/auth/register")}
                           className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs md:text-sm px-4 md:px-5 rounded-xl shadow-md shadow-rose-200 hover:shadow-lg transition-all"
                        >
                           <Heart className="w-3.5 h-3.5 mr-1.5 fill-white" />
                           Register as Donor
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </nav>
      </header>
   )
}

function NavItem({ item }) {
   return (
      <NavLink
         to={item.path}
         className={({ isActive }) =>
            `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
               isActive
                  ? "text-rose-600 bg-rose-50/80 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`
         }
      >
         {({ isActive }) => (
            <span className="flex items-center gap-1.5">
               {item.label}
               {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
               )}
            </span>
         )}
      </NavLink>
   )
}

function MobileNav({ user, navigate }) {
   const [isOpen, setIsOpen] = useState(false)
   const closeSheet = () => setIsOpen(false)

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
         <SheetTrigger asChild>
            <Button
               variant="ghost"
               size="icon"
               className="md:hidden text-slate-700 hover:bg-slate-100 rounded-xl"
               aria-label="Open mobile menu"
            >
               <Menu className="h-6 w-6" />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="w-[300px] sm:w-[360px] p-0 flex flex-col bg-white">
            {/* Sheet Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-br from-rose-50/50 to-white">
               <NavLink to="/" className="flex items-center gap-2.5" onClick={closeSheet}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-md shadow-rose-200">
                     <Droplet className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                     <p className="font-extrabold text-lg text-slate-900 leading-none">
                        Dare<span className="text-rose-600">To</span>Donate
                     </p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        Voluntary Platform
                     </p>
                  </div>
               </NavLink>
            </div>

            {/* Emergency Hotline Notice */}
            <div className="p-4 mx-4 mt-4 rounded-2xl bg-rose-50/80 border border-rose-100">
               <p className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  24/7 Emergency Blood Help
               </p>
               <p className="text-[11px] text-rose-900/70 mt-1">
                  Call directly for urgent hospital blood match requests.
               </p>
               <a
                  href="tel:01540042699"
                  className="mt-2 inline-block text-xs font-extrabold text-rose-600 hover:underline"
               >
                  01540042699
               </a>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
               <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Navigation
               </p>
               {navItems.map((item) => (
                  <NavLink
                     key={item.path}
                     to={item.path}
                     onClick={closeSheet}
                     className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                           isActive
                              ? "bg-rose-50 text-rose-600"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }`
                     }
                  >
                     <span>{item.label}</span>
                     <span className="text-xs text-slate-300">→</span>
                  </NavLink>
               ))}

               <div className="pt-4">
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                     Quick Actions
                  </p>
                  <NavLink
                     to="/find-donor"
                     onClick={closeSheet}
                     className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                     <Search className="w-4 h-4 text-rose-500" />
                     <span>Find Compatible Donors</span>
                  </NavLink>
               </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
               {user ? (
                  <Button
                     onClick={() => {
                        navigate("/dashboard")
                        closeSheet()
                     }}
                     className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold"
                  >
                     Go to Dashboard
                  </Button>
               ) : (
                  <>
                     <Button
                        onClick={() => {
                           navigate("/auth/login")
                           closeSheet()
                        }}
                        variant="outline"
                        className="w-full rounded-xl border-slate-200 font-bold"
                     >
                        Log in
                     </Button>
                     <Button
                        onClick={() => {
                           navigate("/auth/register")
                           closeSheet()
                        }}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md shadow-rose-200"
                     >
                        <Heart className="w-4 h-4 mr-2 fill-white" />
                        Become a Donor
                     </Button>
                  </>
               )}
            </div>
         </SheetContent>
      </Sheet>
   )
}

export default Header
