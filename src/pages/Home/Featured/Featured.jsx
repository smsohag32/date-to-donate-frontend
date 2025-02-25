import asis from "@/assets/featured/asis.webp"
import campaign from "@/assets/featured/campaign.webp"
import donates from "@/assets/featured/donates.webp"
import find from "@/assets/featured/find.webp"
import order from "@/assets/featured/order.webp"
import report from "@/assets/featured/report.webp"
import FeaturedCard from "@/components/cards/FeaturedCard"

const featuredData = [
   {
      name: "Find Donors",
      img: find
   },
   {
      name: "Donates",
      img: donates
   },
   {
      name: "Order Bloods",
      img: order
   },
   {
      name: "Assistant",
      img: asis
   },
   {
      name: "Report",
      img: report
   },
   {
      name: "Campaign",
      img: campaign
   }
]
const Featured = () => {
   return (
      <div className="w-full py-16">
         <div className="main-container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6">
            {featuredData.map((item, index) => <FeaturedCard key={index} item={item} />)}
         </div>
      </div>
   );
};

export default Featured;
