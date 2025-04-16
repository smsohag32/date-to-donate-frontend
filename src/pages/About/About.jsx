import AppBanner from "../Home/Banner/AppBanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Droplet, ArrowRight } from "lucide-react"
import bloodDonateImage from "@/assets/about/blood-donate.webp"
import bloodDonateImage2 from "@/assets/about/blood-donate2.webp"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function About() {
   const testimonials = [
      {
         id: 1,
         name: "Rahul Ahmed",
         role: "Regular Donor",
         image: "/placeholder.svg?height=48&width=48",
         testimonial:
            "I've been donating blood for 5 years now. The feeling of knowing my donation has helped save someone's life is indescribable.",
      },
      {
         id: 2,
         name: "Fatima Khan",
         role: "First-time Donor",
         image: "",
         testimonial:
            "I was nervous about donating for the first time, but the team made me feel comfortable. Now I encourage all my friends to donate.",
      },
      {
         id: 3,
         name: "Arif Hossain",
         role: "Blood Recipient",
         image: "/placeholder.svg?height=48&width=48",
         testimonial:
            "After my accident, I needed multiple transfusions. I'm alive today because of generous donors. Now I volunteer to give back.",
      },
      {
         id: 4,
         name: "Priya Sharma",
         role: "Regular Donor",
         image: "",
         testimonial:
            "Donating blood is the most direct way I can help others. It costs nothing but a little time and can save multiple lives.",
      },
      {
         id: 5,
         name: "Mohammed Ali",
         role: "Volunteer",
         image: "/placeholder.svg?height=48&width=48",
         testimonial:
            "Working with blood donation drives has shown me how a small act of kindness can create ripples of positive change in our community.",
      },
      {
         id: 6,
         name: "Nusrat Jahan",
         role: "Blood Recipient",
         image: "",
         testimonial:
            "During my pregnancy complications, I received blood that saved both me and my baby. I'm forever grateful to the anonymous donors.",
      },
   ]

   const getInitials = (name) => {
      const names = name.split(" ")
      if (names.length === 1) return names[0].charAt(0).toUpperCase()
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
   }

   return (
      <div className="min-h-screen bg-white overflow-hidden">
         {/* Hero Section */}
         <section className="relative py-16 md:py-24 bg-gradient-to-r from-red-50 to-red-100">
            <div className="main-container">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Saving Lives Through <span className="text-red-600">Blood Donation</span>
                     </h1>
                     <p className="text-lg text-gray-700">
                        At Donate To Care, we are dedicated to saving lives by fostering a culture of compassion and unity
                        through blood donation.
                     </p>
                     <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Become a Donor <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                  </div>
                  <div className="relative">
                     <img src={bloodDonateImage || "/placeholder.svg"} alt="Blood donation" className="" />
                  </div>
               </div>
            </div>
         </section>

         {/* Mission Section */}
         <section className="py-16 md:py-24">
            <div className="main-container">
               <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-700">
                     Established with the vision to address the growing demand for blood in Bangladesh, our platform connects
                     voluntary donors with those in need, ensuring that no life is lost due to a lack of blood.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Heart className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Save Lives</h3>
                        <p className="text-gray-600">
                           Your donation can save up to three lives and bring hope to families in crisis.
                        </p>
                     </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Users className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Connect Communities</h3>
                        <p className="text-gray-600">
                           We bridge the gap between donors and recipients, creating a network of compassion.
                        </p>
                     </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Droplet className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Raise Awareness</h3>
                        <p className="text-gray-600">We educate communities about the importance of regular blood donation.</p>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </section>

         {/* Impact Section */}
         <section className="py-16 md:py-24 bg-gray-50">
            <div className="main-container">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                     <img src={bloodDonateImage2 || "/placeholder.svg"} alt="Blood donation impact" className="" />
                  </div>
                  <div className="space-y-6 order-1 md:order-2">
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Need in Bangladesh</h2>
                     <p className="text-lg text-gray-700">
                        In Bangladesh, thousands of patients, including children, pregnant women, and accident victims, urgently
                        require blood every day. Unfortunately, many struggle to find donors in time.
                     </p>
                     <p className="text-lg text-gray-700">
                        By joining our initiative, you can make a direct impact and bring hope to countless lives.
                     </p>
                     <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                           <p className="text-3xl font-bold text-red-600">10,000+</p>
                           <p className="text-gray-600">Lives Saved</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                           <p className="text-3xl font-bold text-red-600">5,000+</p>
                           <p className="text-gray-600">Active Donors</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Testimonials */}
         <section className="py-16 md:py-24">
            <div className="main-container">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Donor Stories</h2>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                     <Card
                        key={testimonial.id}
                        className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                     >
                        <CardContent className="p-6">
                           <div className="flex items-center mb-4">
                              <Avatar className="h-12 w-12 mr-4 border-2 border-red-100">
                                 {testimonial.image ? <AvatarImage src={testimonial.image} alt={testimonial.name} /> : null}
                                 <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                                    {getInitials(testimonial.name)}
                                 </AvatarFallback>
                              </Avatar>
                              <div>
                                 <h4 className="font-semibold">{testimonial.name}</h4>
                                 <p className="text-sm text-gray-500">{testimonial.role}</p>
                              </div>
                           </div>
                           <p className="text-gray-700">{testimonial.testimonial}</p>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-16 md:py-24 bg-[#FF2156] text-[#ffffff]">
            <div className="main-container text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission Today</h2>
               <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Your donation can be the difference between life and death for someone in need. Register as a donor or
                  organize a blood drive in your community.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-red-600 hover:bg-gray-100">Register as Donor</Button>
                  <button className="border-white border px-4  rounded-[8px] text-white hover:bg-red-700">Learn More</button>
               </div>
            </div>
         </section>
         <AppBanner />
      </div>
   )
}
