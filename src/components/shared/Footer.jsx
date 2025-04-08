"use client"

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, NavLink } from "react-router-dom"
import LogoRegular from "@/assets/logo/LogoRegular"


const Footer = () => {

   return (
      <footer className="bg-white  overflow-hidden  shadow">
         <div className="main-container py-12">

            <div
               data-aos="fade-up"
               data-aos-delay="100"
               className="flex flex-col md:flex-row justify-between items-center bg-red-50 rounded-xl p-6 mb-10"
            >
               <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-red-700 flex items-center">
                     <Heart className="mr-2 h-5 w-5 fill-red-500 text-red-500" />
                     Join Our Lifesaving Community
                  </h3>
                  <p className="text-gray-600 mt-1">
                     Subscribe to receive updates on blood drives and donation opportunities
                  </p>
               </div>
               <div className="flex w-full items-center md:w-auto">
                  <Input
                     type="email"
                     placeholder="Your email address"
                     className="rounded-r-none bg-[#f8f8f8] focus-visible:ring-red-500"
                  />
                  <Button className="rounded-l-none py-4.5 bg-red-600 hover:bg-red-700">Subscribe</Button>
               </div>
            </div>

            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* About section */}
               <div data-aos="fade-right" data-aos-delay="150">
                  <div className="font-bold text-lg mb-4">
                     <span>About</span>
                     <NavLink to="/" className="flex items-center mt-3 space-x-2">
                        <LogoRegular className="w-5" />
                        <p>
                           <span className="text-[#FF2156] tracking-tighter font-medium text-lg ">Dare </span>
                           <span className="text-[#595959] font-normal">To</span>
                           <span className="text-[#FF2156] tracking-tighter font-medium text-lg "> Donate</span>
                        </p>
                     </NavLink>
                  </div>
                  <p className="text-gray-600 mb-4">
                     We connect blood donors with patients in need, making the donation process simple and accessible for
                     everyone.
                  </p>
                  <div className="flex space-x-4">
                     <Link to="/" className="text-gray-600 hover:text-red-600">
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                     </Link>
                     <Link to="/" className="text-gray-600 hover:text-red-600">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                     </Link>
                     <Link to="/" className="text-gray-600 hover:text-red-600">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                     </Link>
                  </div>
               </div>

               {/* Quick Links */}
               <div data-aos="fade-up" data-aos-delay="200">
                  <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                     <li data-aos="fade-left" data-aos-delay="250">
                        <Link to="/find-donor" className="text-gray-600 hover:text-red-600">
                           Find a Donor
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="300">
                        <Link to="/register" className="text-gray-600 hover:text-red-600">
                           Register as Donor
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="350">
                        <Link to="/request-blood" className="text-gray-600 hover:text-red-600">
                           Request Blood
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="400">
                        <Link to="/eligibility" className="text-gray-600 hover:text-red-600">
                           Donation Eligibility
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Resources */}
               <div data-aos="fade-up" data-aos-delay="250">
                  <h4 className="font-bold text-lg mb-4">Resources</h4>
                  <ul className="space-y-2">
                     <li data-aos="fade-left" data-aos-delay="300">
                        <Link href="/faq" className="text-gray-600 hover:text-red-600">
                           FAQs
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="350">
                        <Link href="/blog" className="text-gray-600 hover:text-red-600">
                           Blog
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="400">
                        <Link href="/testimonials" className="text-gray-600 hover:text-red-600">
                           Testimonials
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="450">
                        <Link href="/education" className="text-gray-600 hover:text-red-600">
                           Educational Resources
                        </Link>
                     </li>
                     <li data-aos="fade-left" data-aos-delay="500">
                        <Link href="/partners" className="text-gray-600 hover:text-red-600">
                           Our Partners
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* Contact */}
               <div data-aos="fade-left" data-aos-delay="300">
                  <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                  <ul className="space-y-3">
                     <li className="flex items-start" data-aos="zoom-in" data-aos-delay="350">
                        <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                        <span className="text-gray-600">123 Lifesaver Street, Medical District, City, Country</span>
                     </li>
                     <li className="flex items-center" data-aos="zoom-in" data-aos-delay="400">
                        <Phone className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-gray-600">+1 (800) DONATE</span>
                     </li>
                     <li className="flex items-center" data-aos="zoom-in" data-aos-delay="450">
                        <Mail className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-gray-600">contact@daretodonate.org</span>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Bottom section with copyright */}
            <div className="border-t border-gray-200 mt-10 pt-6">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-600 text-sm mb-4 md:mb-0">
                     &copy; {new Date().getFullYear()} DareToDonate. All rights reserved.
                  </p>
                  <div className="flex space-x-6">
                     <Link href="/privacy" className="text-gray-600 hover:text-red-600 text-sm">
                        Privacy Policy
                     </Link>
                     <Link href="/terms" className="text-gray-600 hover:text-red-600 text-sm">
                        Terms of Service
                     </Link>
                     <Link href="/accessibility" className="text-gray-600 hover:text-red-600 text-sm">
                        Accessibility
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer

