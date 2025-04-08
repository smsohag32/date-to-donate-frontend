
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

// const itemVariant = {
//    hidden: { y: 50, opacity: 0 },
//    show: {
//       y: 0,
//       opacity: 1,
//       transition: {
//          type: "spring",
//          stiffness: 100,
//          damping: 15,
//       },
//    },
// }

const FeaturedCard = ({ item, index }) => {
   const navigate = useNavigate()
   const { name, img, link = `/${name?.toLowerCase().replace(/\s+/g, "-")}` } = item

   const handleClick = () => {
      navigate(link)
   }

   return (
      <motion.div
         onClick={handleClick}
         style={{ boxShadow: "0px 0px 30px 0px #4242421A" }}
         className="bg-[#FFFFFF] justify-center cursor-pointer items-center w-full px-5 pt-5 pb-8 flex flex-col gap-4 rounded-[10px]
                    transition-all !duration-500  hover:shadow-xl"
         // variants={itemVariant}
         whileHover={{
            scale: 1.03,
            transition: { duration: 0.8 },
         }}
         whileTap={{ scale: 0.98 }}
         data-aos="zoom-in"
         data-aos-delay={index * 100}
      >
         <motion.img
            src={img || "/placeholder.svg"}
            className="w-[100px]"
            alt={name}
            whileHover={{
               scale: 1.1,
               rotate: [0, 5, -5, 0],
               transition: { duration: 0.5 },
            }}
         />
         <p className="text-[#7E7E7E] text-[28px] font-normal">{name}</p>
      </motion.div>
   )
}

export default FeaturedCard

