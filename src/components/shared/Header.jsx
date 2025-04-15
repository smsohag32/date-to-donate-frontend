import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/assets/logo/Logo";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import UserAvatar from "../avater/UserAvatar";

const navItems = [
   { path: "/", label: "Home" },
   { path: "/find-donor", label: "Find Donor" },
   { path: "/contact-us", label: "Contact" },
   { path: "/about", label: "About" },
];

const Header = () => {
   const { user } = useAuth()
   const navigate = useNavigate();
   return (
      <header className="sticky bg-[#FF2156] top-0 z-50 w-full">
         <div className="main-container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6 w-full lg:w-auto">
               <MobileNav />
               <NavLink to="/" className="flex items-center space-x-3">
                  <Logo className="w-4" />
                  <span className="text-[#f1eaea]  font-semibold text-lg">
                     Dare to Donate
                  </span>
               </NavLink>
            </div>
            { }
            <div className="flex items-center gap-10">
               <DesktopNav />
               <div className="">
                  {user ? <UserAvatar /> : <button onClick={() => navigate("/login")} className="secondary-btn !text-xs md:text-sm whitespace-nowrap">
                     LOG IN
                  </button>}
               </div>
            </div>
         </div>
      </header>
   );
};

function NavItem({ item, onClick }) {
   return (
      <NavLink to={item.path} className="relative " onClick={onClick}>
         {({ isActive }) => (
            <div className="relative !py-[21px] text-sm font-medium transition-colors text-white">
               {item.label}
               {isActive && (
                  <motion.div
                     className="absolute bottom-0 left-0 h-[2px] bg-white"
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
               )}
            </div>
         )}
      </NavLink>
   );
}

function DesktopNav() {
   return (
      <nav className="hidden md:flex items-center space-x-8">
         {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
         ))}
      </nav>
   );
}

function MobileNav() {
   const [isOpen, setIsOpen] = useState(false);
   const { user } = useAuth()
   const closeSheet = () => setIsOpen(false);

   return (

      <>

         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
               <Button
                  variant="outline"
                  className="px-0  cursor-pointer text-base   md:hidden"
                  onClick={() => setIsOpen(true)}
               >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#FF2156]/80 px-6 pb-6 pt-4">
               <NavLink to="/" className="flex items-center space-x-2" onClick={closeSheet}>
                  <Logo className="w-5" />
                  <span className="text-[#f1eaea] tracking-tighter font-medium text-lg">
                     Dare to Donate
                  </span>
               </NavLink>

               <nav className="flex flex-col space-y-2 mt-4">
                  {navItems.map((item) => (
                     <NavItem key={item.path} item={item} onClick={closeSheet} />
                  ))}

                  {user ? <></> : <Link to="/login" className="secondary-btn flex items-center justify-center mt-10" onClick={closeSheet}>
                     LOG IN
                  </Link>}

               </nav>
            </SheetContent>
         </Sheet>
      </>
   );
}

export default Header;
