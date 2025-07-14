import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppBanner from "../Home/Banner/AppBanner"
import DonorSection from "../Home/DonorSection/DonorSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound, HeartHandshake, Award, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

const FindDonor = () => {
   const navigate = useNavigate()
   return (
      <div className="min-h-screen bg-white overflow-hidden">
         {/* Hero Section */}
         {/* <section className="relative pt-16 backdrop-blur-sm shadow-sm shadow-rose-50 bg-rose-300/10">
            <div className="main-container">
               <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-800">Find a Donor, Save a Life</h1>
                  <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                     Connect with compassionate donors in your area who are ready to help. Every donation makes a difference.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Button onClick={() => navigate("/about")} size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        Learn How It Works
                     </Button>
                  </div>
               </div>
            </div>
         </section> */}

         {/* Original DonorSection */}
         <DonorSection />

         {/* How It Works Section */}
         <section className="py-16 bg-white">
            <div className="main-container">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                     Our simple process connects those in need with willing donors quickly and efficiently.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                           <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                              <UserRound className="h-6 w-6 text-red-600" />
                           </div>
                           <h3 className="text-xl font-semibold mb-2">Create a Request</h3>
                           <p className="text-gray-600">
                              Fill out a simple form with your location and requirements to create your donation request.
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                           <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                              <Users className="h-6 w-6 text-red-600" />
                           </div>
                           <h3 className="text-xl font-semibold mb-2">Match with Donors</h3>
                           <p className="text-gray-600">
                              Our system matches your request with compatible donors in your area automatically.
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                           <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                              <HeartHandshake className="h-6 w-6 text-red-600" />
                           </div>
                           <h3 className="text-xl font-semibold mb-2">Connect Safely</h3>
                           <p className="text-gray-600">
                              Connect with donors through our secure platform and coordinate the donation process.
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className="py-16 bg-gray-50">
            <div className="main-container">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                     Hear from people whose lives have been changed through our donor network.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                     <Card key={index} className="border-none shadow-md">
                        <CardContent className="pt-6">
                           <div className="flex flex-col h-full">
                              <div className="mb-4 text-red-600">{"★".repeat(5)}</div>
                              <p className="text-gray-700 italic mb-4 flex-grow">{testimonial.quote}</p>
                              <div className="flex mt-auto items-center">
                                 <Avatar className="h-12 w-12 mr-4 border-2 border-red-100">
                                    {testimonial.image ? <AvatarImage src={testimonial.image} alt={testimonial.name} /> : null}
                                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                                       {(testimonial.name?.slice(0, 1) || "").toUpperCase()}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="py-16 bg-white">
            <div className="main-container">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  {stats.map((stat, index) => (
                     <div key={index} className="p-6">
                        <div className="flex justify-center mb-4">
                           <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                              <Award className="h-6 w-6 text-red-600" />
                           </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Original AppBanner */}
         <AppBanner />
      </div>
   )
}

// Sample data
const testimonials = [
   {
      quote: "I found a compatible donor within 24 hours. This platform literally saved my life.",
      name: "Sarah Johnson",
      location: "New York, NY",
   },
   {
      quote: "The process was so simple and the support team was incredibly helpful throughout.",
      name: "Michael Chen",
      location: "San Francisco, CA",
   },
   {
      quote: "As a donor, I feel blessed to have been able to help someone in need. This platform made it possible.",
      name: "David Williams",
      location: "Chicago, IL",
   },
]

const stats = [
   { value: "10,000+", label: "Successful Donations" },
   { value: "24/7", label: "Support Available" },
   { value: "98%", label: "Match Rate" },
   { value: "50+", label: "Cities Covered" },
]

export default FindDonor
