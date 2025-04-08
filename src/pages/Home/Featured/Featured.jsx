
import { motion } from "framer-motion"

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
      img: find,
      link: "/find-donor",
   },
   {
      name: "Donates",
      img: donates,
      link: "/find-donor",
   },
   {
      name: "Order Bloods",
      img: order,
      link: "/find-donor",
   },
   {
      name: "Assistant",
      img: asis,
      link: "/",
   },
   {
      name: "Report",
      img: report,
      link: "/",
   },
   {
      name: "Campaign",
      img: campaign,
      link: "/",
   },
]

const container = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         delayChildren: 0.1,
      },
   },
}

const Featured = () => {


   return (
      <div className="w-full py-16 " id="featured-section">
         <motion.div
            className="main-container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
         >
            {featuredData.map((item, index) => (
               <FeaturedCard key={index} item={item} index={index} />
            ))}
         </motion.div>
      </div>
   )
}

export default Featured

