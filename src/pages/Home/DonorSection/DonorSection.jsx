
import { useState } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "aos/dist/aos.css"

import filterImage from "@/assets/icon/filter.png"
import DonorCard from "@/components/cards/DonorCard"
import { useGetDonorsQuery } from "@/redux-store/services/donor-api"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Loading from "@/components/skeleton/Loading"
import EmptyState from "@/components/Empty/Empty"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const DonorSection = () => {
   const [searchText, setSearchText] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(true)

   const [selectedBloodGroup, setSelectedBloodGroup] = useState("All")

   const [availableToday, setAvailableToday] = useState(false)
   const [hasRecentlyDonated, setHasRecentlyDonated] = useState(false)
   const [isRegularDonor, setIsRegularDonor] = useState(false)

   const [currentPage, setCurrentPage] = useState(1)


   const { data, isLoading, isFetching } = useGetDonorsQuery({
      page: currentPage,
      limit: 9,
      blood_group: selectedBloodGroup === "All" ? "" : selectedBloodGroup,
      searchText: searchText,
   })



   const resetFilters = () => {
      setSelectedBloodGroup("All")
      setAvailableToday(false)
      setHasRecentlyDonated(false)
      setIsRegularDonor(false)
      setCurrentPage(1) // Reset to first page when filters change
   }

   // Handle page change
   const handlePageChange = (page) => {
      setCurrentPage(page)
      // Scroll to top of donor section
      window.scrollTo({
         top: document.getElementById("donor-section")?.offsetTop - 100 || 0,
         behavior: "smooth",
      })
   }

   // Generate pagination items
   const generatePaginationItems = () => {
      const totalPages = data?.data?.totalPages || 0

      if (totalPages <= 6) {
         // If 6 or fewer pages, show all page numbers
         return Array.from({ length: totalPages }, (_, i) => i + 1)
      } else {
         // For more than 6 pages, show first, last, current, and nearby pages
         let pages = []

         // Always include first page
         pages.push(1)

         // Logic for middle pages
         if (currentPage <= 3) {
            // Near the start
            pages = [...pages, 2, 3, 4, "...", totalPages]
         } else if (currentPage >= totalPages - 2) {
            // Near the end
            pages = [...pages, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
         } else {
            // In the middle
            pages = [...pages, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
         }

         return pages
      }
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

   return (
      <div
         id="donor-section"
         className="relative overflow-hidden pb-12 bg-opacity-5 backdrop-opacity-50 rounded-[8px] backdrop-blur-sm shadow-sm shadow-rose-50 bg-rose-300/10 min-h-[730px]"
      >
         <motion.div
            className="main-container relative z-40 py-8 "
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
                     placeholder="Search by name, blood group, or location"
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
                        className="w-[22px] h-[28px]"
                        animate={{ rotate: isFilterOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                     />
                  </motion.button>
               </motion.div>
            </motion.div>

            <AnimatePresence>
               {isFilterOpen && (
                  <motion.div className="w-full" initial="hidden" animate="visible" exit="hidden" variants={filterVariants}>
                     <div className="p-6 mt-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                           <div className="flex items-center">
                              <div className="w-1 h-6 bg-rose-500 rounded-full mr-3"></div>
                              <h4 className="text-lg font-semibold text-gray-800">Filter Donors</h4>
                           </div>
                           <motion.button
                              onClick={() => setIsFilterOpen(false)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                           >
                              <X size={20} />
                           </motion.button>
                        </div>

                        <div className="space-y-8">
                           {/* Blood Group Selection - Radio Buttons */}
                           <div className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                              <div className="grid grid-cols-2 md:grid-cols-9 gap-2">
                                 {bloodGroups.map((group) => (
                                    <div key={group} className="relative">
                                       <input
                                          type="radio"
                                          id={`blood-group-${group}`}
                                          name="blood-group"
                                          value={group}
                                          checked={selectedBloodGroup === group}
                                          onChange={() => setSelectedBloodGroup(group)}
                                          className="peer sr-only"
                                       />
                                       <label
                                          htmlFor={`blood-group-${group}`}
                                          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-sm font-medium transition-all hover:bg-gray-50 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-600"
                                       >
                                          {group}
                                       </label>
                                    </div>
                                 ))}
                              </div>
                              {/* Update the clear selection button to set to "All" instead of empty string */}
                              {selectedBloodGroup && selectedBloodGroup !== "All" && (
                                 <button
                                    onClick={() => setSelectedBloodGroup("All")}
                                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center mt-1"
                                 >
                                    <X size={12} className="mr-1" /> Clear selection
                                 </button>
                              )}
                           </div>

                           {/* Availability Checkboxes */}
                           {/* <div className="space-y-4">
                              <div className="flex items-center">
                                 <div className="w-1 h-5 bg-rose-500 rounded-full mr-3"></div>
                                 <h5 className="text-sm font-medium text-gray-700">Availability Preferences</h5>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                                 <div className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-sm border border-gray-100">
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
                                 <div className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-sm border border-gray-100">
                                    <Checkbox
                                       id="recently-donated"
                                       checked={hasRecentlyDonated}
                                       onCheckedChange={(checked) => setHasRecentlyDonated(checked)}
                                       className="data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                                    />
                                    <label htmlFor="recently-donated" className="text-sm text-gray-700 cursor-pointer">
                                       Recently Donated
                                    </label>
                                 </div>
                                 <div className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-sm border border-gray-100">
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
                           </div> */}

                           {/* Action Buttons */}
                           <div className="flex justify-end space-x-3">
                              <Button
                                 variant="outline"
                                 onClick={resetFilters}
                                 className="border-gray-300 text-gray-700 hover:bg-gray-50 px-5"
                              >
                                 Reset
                              </Button>
                              <Button
                                 onClick={() => setIsFilterOpen(false)}
                                 className="bg-[#FF2156] hover:bg-[#e01c4c] text-white px-5 shadow-md"
                              >
                                 Apply Filters
                              </Button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {isLoading || isFetching ? (
               <Loading />
            ) : data?.data?.donors?.length > 0 ? (
               <motion.div
                  className="grid mt-20 relative lg:grid-cols-3 z-50 gap-10 md:grid-cols-3 grid-cols-1"
                  variants={containerVariants}
               >
                  {data?.data?.donors?.length > 0 &&
                     data?.data?.donors?.map((donor, index) => (
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
            ) : (
               <EmptyState
                  title="No Donors Found"
                  description="We couldn't find any donors at the moment. Please check back later or try refining your search."
               />
            )}

            {/* Pagination Component */}
            {data?.data?.donors?.length > 0 && data?.data?.totalPages > 1 && (
               <motion.div
                  className="flex justify-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
               >
                  <div className="flex items-center justify-center space-x-2">
                     {/* Previous Button */}
                     <button
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center h-10 w-10 rounded-md border transition-colors ${currentPage === 1
                           ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                           : "border-gray-200 bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                           }`}
                     >
                        <ChevronLeft size={18} />
                     </button>

                     {/* Page Numbers */}
                     {generatePaginationItems().map((page, index) => (
                        <button
                           key={index}
                           onClick={() => typeof page === "number" && handlePageChange(page)}
                           disabled={page === "..."}
                           className={`flex items-center justify-center h-10 w-10 rounded-md border transition-colors ${page === currentPage
                              ? "border-rose-500 bg-rose-50 text-rose-600 font-medium"
                              : page === "..."
                                 ? "border-transparent bg-transparent text-gray-500 cursor-default"
                                 : "border-gray-200 bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                              }`}
                        >
                           {page}
                        </button>
                     ))}

                     {/* Next Button */}
                     <button
                        onClick={() => currentPage < data?.data?.totalPages && handlePageChange(currentPage + 1)}
                        disabled={currentPage === data?.data?.totalPages}
                        className={`flex items-center justify-center h-10 w-10 rounded-md border transition-colors ${currentPage === data?.data?.totalPages
                           ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                           : "border-gray-200 bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                           }`}
                     >
                        <ChevronRight size={18} />
                     </button>
                  </div>
               </motion.div>
            )}
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
