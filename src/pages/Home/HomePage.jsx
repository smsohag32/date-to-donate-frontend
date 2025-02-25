import DonorSection from "./DonorSection/DonorSection";
import Featured from "./Featured/Featured";
import Hero from "./Hero/Hero";

const HomePage = () => {
   return (
      <div>
         <Hero />
         <Featured />
         <DonorSection />
      </div>
   );
};

export default HomePage;
