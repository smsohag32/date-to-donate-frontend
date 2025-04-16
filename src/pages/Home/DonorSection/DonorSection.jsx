"use client"

import { useState, useEffect } from "react"
import { Search, X, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"

// import lineImage from "@/assets/bg/line.webp"
import filterImage from "@/assets/icon/filter.png"
import DonorCard from "@/components/cards/DonorCard"
import { useGetDonorsQuery } from "@/redux-store/services/donor-api"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Loading from "@/components/skeleton/Loading"
import EmptyState from "@/components/Empty/Empty"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const DonorSection = () => {
   const [searchText, setSearchText] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(true)
   const [selectedBloodGroup, setSelectedBloodGroup] = useState("")
   const [distance, setDistance] = useState(50)
   const [availableToday, setAvailableToday] = useState(false)
   const [hasRecentlyDonated, setHasRecentlyDonated] = useState(false)
   const [isRegularDonor, setIsRegularDonor] = useState(false)
   const [showBloodGroupDropdown, setShowBloodGroupDropdown] = useState(false)

   const { data, isLoading, isFetching } = useGetDonorsQuery({
      page: 1,
      limit: 10,
      blood_group: selectedBloodGroup,
      searchText: searchText,
   })


   // Initialize AOS
   useEffect(() => {
      AOS.init({
         duration: 800,
         once: false,
         mirror: true,
      })
   }, [])

   const resetFilters = () => {
      setSelectedBloodGroup("")
      setDistance(50)
      setAvailableToday(false)
      setHasRecentlyDonated(false)
      setIsRegularDonor(false)
   }

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

   const dropdownVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.2 },
      },
   }

   return (
      <div className="relative overflow-hidden pb-12 bg-opacity-5 backdrop-opacity-50 rounded-[8px] backdrop-blur-sm shadow-sm shadow-rose-50 bg-rose-300/10 min-h-[730px]">
         <motion.div
            className="main-container relative z-40 py-8 px-5 lg:px-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            data-aos="fade-up"
         >

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
                     className="bg-white border border-slate-200 outline-none pe-5 ps-14 py-3 w-full rounded-[8px]"
                     placeholder="Search"
                  />
               </motion.div>
               <motion.div whileTap={{ scale: 0.95 }}>
                  <motion.button
                     onClick={() => setIsFilterOpen(!isFilterOpen)}
                     className="bg-[#FF2156] rounded-[6px] cursor-pointer p-2"
                     whileHover={{ scale: 1.01 }}
                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                     <motion.img
                        src={filterImage}
                        alt="Filter"
                        className="w-[22px] h-[30px]"
                        animate={{ rotate: isFilterOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                     />
                  </motion.button>
               </motion.div>
            </motion.div>

            <AnimatePresence>
               {isFilterOpen && (
                  <motion.div
                     className="w-full"
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                     variants={filterVariants}
                  >
                     <div className="p-6 mt-4 bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                           <h4 className="text-lg font-semibold text-gray-800">Filter Donors</h4>
                           <motion.button
                              onClick={() => setIsFilterOpen(false)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-gray-500 hover:text-gray-700"
                           >
                              <X size={20} />
                           </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Blood Group Selection */}
                           <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                              <div className="relative">
                                 <button
                                    onClick={() => setShowBloodGroupDropdown(!showBloodGroupDropdown)}
                                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                                 >
                                    <span>{selectedBloodGroup || "Select Blood Group"}</span>
                                    <ChevronDown size={16} className="text-gray-500" />
                                 </button>

                                 <AnimatePresence>
                                    {showBloodGroupDropdown && (
                                       <motion.div
                                          initial="hidden"
                                          animate="visible"
                                          exit="hidden"
                                          variants={dropdownVariants}
                                          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto"
                                       >
                                          {bloodGroups.map((group) => (
                                             <div
                                                key={group}
                                                className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100 ${selectedBloodGroup === group ? "bg-rose-50 text-rose-600" : ""
                                                   }`}
                                                onClick={() => {
                                                   setSelectedBloodGroup(group)
                                                   setShowBloodGroupDropdown(false)
                                                }}
                                             >
                                                <span>{group}</span>
                                                {selectedBloodGroup === group && <Check size={16} className="text-rose-600" />}
                                             </div>
                                          ))}
                                          <div
                                             className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-t border-gray-100"
                                             onClick={() => {
                                                setSelectedBloodGroup("")
                                                setShowBloodGroupDropdown(false)
                                             }}
                                          >
                                             Clear selection
                                          </div>
                                       </motion.div>
                                    )}
                                 </AnimatePresence>
                              </div>
                           </div>

                           {/* Distance Slider */}
                           <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Maximum Distance: {distance} km</label>
                              <Slider
                                 value={[distance]}
                                 min={1}
                                 max={100}
                                 step={1}
                                 onValueChange={(value) => setDistance(value[0])}
                                 className="py-2"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                 <span>1 km</span>
                                 <span>50 km</span>
                                 <span>100 km</span>
                              </div>
                           </div>
                        </div>

                        {/* Availability Checkboxes */}
                        <div className="mt-6">
                           <h5 className="text-sm font-medium text-gray-700 mb-3">Availability</h5>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    id="available-today"
                                    checked={availableToday}
                                    onCheckedChange={(checked) => setAvailableToday(checked)}
                                    className="data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                                 />
                                 <label htmlFor="available-today" className="text-sm text-gray-700 cursor-pointer">
                                    Available Today
                                 </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    id="recently-donated"
                                    checked={hasRecentlyDonated}
                                    onCheckedChange={(checked) => setHasRecentlyDonated(checked)}
                                    className="data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                                 />
                                 <label htmlFor="recently-donated" className="text-sm text-gray-700 cursor-pointer">
                                    Has Recently Donated
                                 </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    id="regular-donor"
                                    checked={isRegularDonor}
                                    onCheckedChange={(checked) => setIsRegularDonor(checked)}
                                    className="data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                                 />
                                 <label htmlFor="regular-donor" className="text-sm text-gray-700 cursor-pointer">
                                    Regular Donor
                                 </label>
                              </div>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                           <Button
                              variant="outline"
                              onClick={resetFilters}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                           >
                              Reset
                           </Button>
                           <Button onClick={() => setIsFilterOpen(false)} className="bg-[#FF2156] hover:bg-[#e01c4c] text-white">
                              Apply Filters
                           </Button>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {isLoading || isFetching
               ? <Loading />
               : data?.data?.donors?.length > 0 ?
                  <motion.div
                     className="grid mt-20 relative lg:grid-cols-3 z-50 gap-10 md:grid-cols-3 grid-cols-1"
                     variants={containerVariants}
                  >
                     {data?.data?.donors?.length > 0 && data?.data?.donors?.map((donor, index) => (
                        <motion.div
                           key={index}
                           variants={itemVariants}
                           custom={index}
                           data-aos="zoom-in"
                           data-aos-delay={index * 100}
                        >
                           <DonorCard donor={donor} />
                        </motion.div>
                     ))
                     }
                  </motion.div> : <EmptyState
                     title="No Donors Found"
                     description="We couldn't find any donors at the moment. Please check back later or try refining your search."
                  />}

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
