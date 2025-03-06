import lineImage from "@/assets/bg/line.webp"
import DonorCard from "@/components/cards/DonorCard";
import filterImage from "@/assets/icon/filter.png"

import { Search } from "lucide-react";
const DonorSection = () => {
   return (
      <div className="relative overflow-hidden py-16">
         <div className="main-container relative z-40 bg-opacity-5 backdrop-opacity-50 rounded-[8px] backdrop-blur-sm shadow-sm shadow-rose-50 bg-rose-500/10 min-h-[730px] py-8 px-5 lg:px-16 ">
            <div className="flex flex-col items-center justify-center">
               <h4 className="text-[24px] font-semibold">Find A Donor</h4>
               <p className="text-lg text-[#7E7E7E] font-normal max-w-sm mx-auto w-full text-center mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu tristique tristique quam in.</p>
            </div>
            <div className="flex items-center gap-4 mt-6 justify-center">
               <div className="w-full max-w-sm relative">
                  <span className="absolute top-1/2 left-5 transform text-gray-500 -translate-y-1/2"><Search className="text-bases" size={20} /></span>
                  <input type="text" className="bg-white outline-none  pe-5 ps-14 py-3 w-full rounded-[8px]" placeholder="Search" />
               </div>
               <div>
                  <button className="bg-[#FF2156] rounded-[6px] cursor-pointer p-2">
                     <img src={filterImage} alt="Filter" className="w-[22px] h-[32px]" />
                  </button>
               </div>
            </div>
            <div className="grid mt-20 relative lg:grid-cols-3 z-50 gap-10 md:grid-cols-3 grid-cols-1">
               <DonorCard />
               <DonorCard />
               <DonorCard />
            </div>
         </div>

         <div className="w-full absolute !z-5 bottom-10 left-0 right-0 ">
            <img src={lineImage} alt="Dare to Donate" className="w-full h-full" />
         </div>
      </div>
   );
};

export default DonorSection;
