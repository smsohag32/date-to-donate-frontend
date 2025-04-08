import AppBanner from "./Banner/AppBanner";
import DonorSection from "./DonorSection/DonorSection";
import Featured from "./Featured/Featured";
import Hero from "./Hero/Hero";

const HomePage = () => {
   return (
      <div className="overflow-hidden">
         <Hero />
         <Featured />
         <DonorSection />
         <AppBanner />
      </div>
   );
};

export default HomePage;
