import AppBanner from "./Banner/AppBanner"
import DonorSection from "./DonorSection/DonorSection"
import Featured from "./Featured/Featured"
import Hero from "./Hero/Hero"
import HowItWorks from "./HowItWorks/HowItWorks"

const HomePage = () => {
   return (
      <div className="overflow-hidden">
         <Hero />
         <Featured />
         <HowItWorks />
         <DonorSection />
         <AppBanner />
      </div>
   )
}

export default HomePage
