"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"

// import lineImage from "@/assets/bg/line.webp"
import filterImage from "@/assets/icon/filter.png"
import DonorCard from "@/components/cards/DonorCard"
import LoadingDonorCard from "@/components/skeleton/donor-loading-skeleton"
import { useGetDonorsQuery } from "@/redux-store/services/donor-api"

const DonorSection = () => {
   const [searchText, setSearchText] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(false)
   const { data, isLoading } = useGetDonorsQuery({
      page: 1,
      limit: 10,
      blood_group: "",
      searchText: searchText,
   })

   const loadingSkeletons = Array(3)
      .fill(0)
      .map((_, index) => <LoadingDonorCard key={`skeleton-${index}`} />)

   // Initialize AOS
   useEffect(() => {
      AOS.init({
         duration: 800,
         once: false,
         mirror: true,
      })
   }, [])

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.1,
         },
      },
   }

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: { duration: 0.5 },
      },
   }

   const filterVariants = {
      hidden: { height: 0, opacity: 0 },
      visible: {
         height: "auto",
         opacity: 1,
         transition: {
            duration: 0.3,
            ease: "easeInOut",
         },
      },
   }

   return (
      <div className="relative overflow-hidden py-16  bg-opacity-5 backdrop-opacity-50 rounded-[8px] backdrop-blur-sm shadow-sm shadow-rose-50 bg-rose-300/10 min-h-[730px]">
         <motion.div
            className="main-container relative z-40  py-8 px-5 lg:px-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            data-aos="fade-up"
         >
            <motion.div className="flex flex-col items-center justify-center" variants={itemVariants}>
               <h4 className="text-[24px] font-semibold">Find A Donor</h4>
               <p className="text-lg text-[#7E7E7E] font-normal max-w-sm mx-auto w-full text-center mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu tristique tristique quam in.
               </p>
            </motion.div>

            <motion.div className="flex items-center gap-4 mt-6 justify-center" variants={itemVariants}>
               <motion.div
                  className="w-full max-w-xl relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
               >
                  <span className="absolute top-1/2 left-5 transform text-gray-500 -translate-y-1/2">
                     <Search className="text-bases" size={20} />
                  </span>
                  <input
                     onChange={(e) => setSearchText(e.target.value)}
                     type="text"
                     className="bg-white outline-none pe-5 ps-14 py-3 w-full rounded-[8px]"
                     placeholder="Search"
                  />
               </motion.div>
               <motion.div whileTap={{ scale: 0.95 }}>
                  <motion.button
                     onClick={() => setIsFilterOpen(!isFilterOpen)}
                     className="bg-[#FF2156] rounded-[6px] cursor-pointer p-2"
                     whileHover={{ scale: 1.1 }}
                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                     <motion.img
                        src={filterImage}
                        alt="Filter"
                        className="w-[22px] h-[32px]"
                        animate={{ rotate: isFilterOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                     />
                  </motion.button>
               </motion.div>
            </motion.div>

            <AnimatePresence>
               {isFilterOpen && (
                  <motion.div
                     className=" mx-auto rounded-lg"
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                     variants={filterVariants}
                  >
                     <div className="p-4 mt-4 bg-white rounded-lg shadow-sm">
                        <h4 className="text-lg font-semibold">Filter Options</h4>
                        {/* Add filter options here */}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            <motion.div
               className="grid mt-20 relative lg:grid-cols-3 z-50 gap-10 md:grid-cols-3 grid-cols-1"
               variants={containerVariants}
            >
               {isLoading
                  ? loadingSkeletons
                  : data?.data?.donors?.map((donor, index) => (
                     <motion.div
                        key={index}
                        variants={itemVariants}
                        custom={index}
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                     >
                        <DonorCard donor={donor} />
                     </motion.div>
                  ))}
            </motion.div>
         </motion.div>

         {/* <div className="w-full absolute !z-5 bottom-1/3 left-0 right-0">
            <motion.img
               src={lineImage}
               alt="Dare to Donate"
               className="w-full h-full !opacity-20"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 0.2, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
            />
         </div> */}
      </div>
   )
}

export default DonorSection

