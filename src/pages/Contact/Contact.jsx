import AppBanner from "../Home/Banner/AppBanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"

export default function Contact() {
   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <section className="relative py-16 md:py-24 bg-gradient-to-r from-red-50 to-red-100">
            <div className="main-container">
               <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                     Get in <span className="text-red-600">Touch</span>
                  </h1>
                  <p className="text-lg text-gray-700">
                     Have questions about blood donation or need assistance? We&apos;re here to help. Reach out to our team and
                     we&apos;ll get back to you as soon as possible.
                  </p>
               </div>
            </div>
         </section>

         {/* Contact Information */}
         <section className="py-16 md:py-24">
            <div className="main-container">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                     <Card className="border-none shadow-lg">
                        <CardContent className="p-6 space-y-4">
                           <div className="space-y-2">
                              <label htmlFor="name" className="text-sm font-medium">
                                 Full Name
                              </label>
                              <Input id="name" placeholder="Your full name" />
                           </div>
                           <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium">
                                 Email Address
                              </label>
                              <Input id="email" type="email" placeholder="Your email address" />
                           </div>
                           <div className="space-y-2">
                              <label htmlFor="phone" className="text-sm font-medium">
                                 Phone Number
                              </label>
                              <Input id="phone" placeholder="Your phone number" />
                           </div>
                           <div className="space-y-2">
                              <label htmlFor="subject" className="text-sm font-medium">
                                 Subject
                              </label>
                              <Input id="subject" placeholder="Message subject" />
                           </div>
                           <div className="space-y-2">
                              <label htmlFor="message" className="text-sm font-medium">
                                 Message
                              </label>
                              <Textarea id="message" placeholder="Your message" rows={5} />
                           </div>
                           <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                              Send Message <ArrowRight className="ml-2 h-4 w-4" />
                           </Button>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Contact Information */}
                  <div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                     <div className="space-y-6">
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <CardContent className="p-6">
                              <div className="flex items-start">
                                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <MapPin className="h-6 w-6 text-red-600" />
                                 </div>
                                 <div>
                                    <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                                    <p className="text-gray-600">
                                       123 Blood Donation Center
                                       <br />
                                       Dhaka, Bangladesh 1000
                                    </p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <CardContent className="p-6">
                              <div className="flex items-start">
                                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <Phone className="h-6 w-6 text-red-600" />
                                 </div>
                                 <div>
                                    <h3 className="text-xl font-semibold mb-2">Phone Number</h3>
                                    <p className="text-gray-600">
                                       Emergency: +880 1234 567890
                                       <br />
                                       Office: +880 1234 567891
                                    </p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <CardContent className="p-6">
                              <div className="flex items-start">
                                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <Mail className="h-6 w-6 text-red-600" />
                                 </div>
                                 <div>
                                    <h3 className="text-xl font-semibold mb-2">Email Address</h3>
                                    <p className="text-gray-600">
                                       info@donatetocare.org
                                       <br />
                                       support@donatetocare.org
                                    </p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <CardContent className="p-6">
                              <div className="flex items-start">
                                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <Clock className="h-6 w-6 text-red-600" />
                                 </div>
                                 <div>
                                    <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
                                    <p className="text-gray-600">
                                       Monday - Friday: 9:00 AM - 6:00 PM
                                       <br />
                                       Saturday: 10:00 AM - 4:00 PM
                                       <br />
                                       Sunday: Closed
                                    </p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Map Section */}
         <section className="py-16 md:py-24 bg-gray-50">
            <div className="main-container">
               <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Find Us on the Map</h2>
               <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                  {/* Replace with actual map implementation */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                     <p className="text-gray-600">Map will be displayed here</p>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-16 md:py-24 bg-[#FF2156] text-[#ffffff]">
            <div className="main-container text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Save Lives?</h2>
               <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Join our community of donors and help us make a difference in someone&apos;s life today.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-red-600 hover:bg-gray-100">Register as Donor</Button>
                  <button className="border-white border px-4 rounded-[8px] text-white hover:bg-red-700">Learn More</button>
               </div>
            </div>
         </section>
         <AppBanner />
      </div>
   )
}
