import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import bloodIcon from "@/assets/icon/blood.png"
const DonorCard = () => {
   return (
      <Card className="relative w-full   bg-[#FFFFFF] py-8 px-5 flex flex-col items-center border-none  rounded-[8px]" style={{ boxShadow: "0px 0px 30px 0px #4242421A", }}>
         <div className="absolute   -top-10 -right-4   flex items-center justify-center text-white font-bold text-xl"
         >
            <div className="relative w-[60px] h-[97px] flex items-center justify-center">
               <img src={bloodIcon} alt="Blood" className="absolute  w-80  z-10 top-0 left-0 right-0 bottom-0" />
               <p className="z-20 absolute -translate-y-1/2 top-1/2 transform ">A+</p>
            </div>
         </div>


         {/* Profile Image */}
         <div className="rounded-lg overflow-hidden w-[152px] h-[152px] mb-4">
            <img
               src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D"
               alt="Donor profile"
               className="w-full h-full object-cover bg-teal-200"
            />
         </div>

         {/* Name */}
         <h2 className="text-xl font-bold  ">Yasin Hossain</h2>
         <div className="flex items-center text-gray-500">
            <MapPin className="w-5 h-5 text-red-500 mr-1" />
            <span>Mohammedpur, Dhaka</span>
         </div>
      </Card>
   );
};

export default DonorCard;
