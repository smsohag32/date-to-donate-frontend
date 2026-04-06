
import { useState } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "aos/dist/aos.css"

import filterImage from "@/assets/icon/filter.png"
import DonorCard from "@/components/cards/DonorCard"
import { useGetDonorsQuery } from "@/redux-store/services/donor-api"
import { Button } from "@/components/ui/button"
import Loading from "@/components/skeleton/Loading"
import EmptyState from "@/components/Empty/Empty"
import { PaginationControls } from "@/components/pagination/PaginationControl"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const DonorSection = () => {
   const [searchText, setSearchText] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(false)
   const [selectedBloodGroup, setSelectedBloodGroup] = useState("All")
   const [currentPage, setCurrentPage] = useState(0)

   const { data, isLoading, isFetching } = useGetDonorsQuery({
      page: currentPage,
      limit: 8,
      blood_group: selectedBloodGroup === "All" ? "" : selectedBloodGroup,
      searchText: searchText,
   })

   const resetFilters = () => {
      setSelectedBloodGroup("All")
      setSearchText("")
      setCurrentPage(0)
   }

   const handlePageChange = (page) => {
      setCurrentPage(page)
      window.scrollTo({
         top: document.getElementById("donor-section")?.offsetTop - 100 || 0,
         behavior: "smooth",
      })
   }

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.1 },
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

   return (
      <section id="donor-section" className="py-24 bg-slate-50/50">
         <div className="main-container">
            {/* Header Content */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
               <motion.h2
                  className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  Find a <span className="text-rose-600">Life Saver</span>
               </motion.h2>
               <motion.p
                  className="text-slate-500 text-lg font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
               >
                  Connect with compassionate donors in your community. Every donation is a gift of life.
               </motion.p>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-12">
               <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-4xl mx-auto">
                  <div className="relative flex-grow group">
                     <span className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-rose-500 transition-colors">
                        <Search size={22} />
                     </span>
                     <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        type="text"
                        className="w-full h-14 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-50 transition-all text-slate-700 font-medium shadow-sm"
                        placeholder="Search by name or location..."
                     />
                  </div>
                  <motion.button
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setIsFilterOpen(!isFilterOpen)}
                     className={`h-14 px-8 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${isFilterOpen
                           ? "bg-rose-600 text-white shadow-rose-200"
                           : "bg-white text-slate-700 border-2 border-slate-100 hover:border-rose-200"
                        }`}
                  >
                     <img src={filterImage} alt="Filter" className={`w-5 h-5 ${isFilterOpen ? "brightness-0 invert" : ""}`} />
                     {isFilterOpen ? "Hide Filters" : "Filters"}
                  </motion.button>
               </div>

               {/* Modern Filter Panel */}
               <AnimatePresence>
                  {isFilterOpen && (
                     <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="max-w-4xl mx-auto mt-6 overflow-hidden"
                     >
                        <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 shadow-xl shadow-slate-100/50">
                           <div className="space-y-8">
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between">
                                    <label className="text-lg font-bold text-slate-800">Filter by Blood Group</label>
                                    {selectedBloodGroup !== "All" && (
                                       <button
                                          onClick={() => setSelectedBloodGroup("All")}
                                          className="text-rose-600 text-sm font-bold hover:underline underline-offset-4"
                                       >
                                          Reset Selection
                                       </button>
                                    )}
                                 </div>
                                 <div className="flex flex-wrap gap-3">
                                    {bloodGroups.map((group) => (
                                       <motion.button
                                          key={group}
                                          onClick={() => setSelectedBloodGroup(group)}
                                          whileHover={{ y: -2 }}
                                          whileTap={{ scale: 0.9 }}
                                          className={`px-5 py-2.5 rounded-xl font-bold transition-all border-2 ${selectedBloodGroup === group
                                                ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200"
                                                : "bg-white border-slate-100 text-slate-600 hover:border-rose-200"
                                             }`}
                                       >
                                          {group}
                                       </motion.button>
                                    ))}
                                 </div>
                              </div>

                              <div className="flex justify-end pt-4 border-t border-slate-50 gap-4">
                                 <Button variant="ghost" onClick={resetFilters} className="font-bold text-slate-400 hover:text-rose-600">
                                    Clear All
                                 </Button>
                                 <Button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl font-bold h-12"
                                 >
                                    Apply Changes
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Donor Grid */}
            <div className="relative min-h-[400px]">
               {isLoading || isFetching ? (
                  <Loading />
               ) : data?.data?.donors?.length > 0 ? (
                  <>
                     <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                     >
                        {data?.data?.donors.map((donor, index) => (
                           <motion.div key={index} variants={itemVariants}>
                              <DonorCard donor={donor} />
                           </motion.div>
                        ))}
                     </motion.div>

                     {/* Pagination */}
                     {data?.data?.totalPages > 1 && (
                        <div className="mt-20 flex justify-center">
                           <PaginationControls
                              currentPage={currentPage}
                              onPageChange={handlePageChange}
                              totalPages={data?.data?.totalPages}
                           />
                        </div>
                     )}
                  </>
               ) : (
                  <div className="py-20">
                     <EmptyState
                        title="No Donors Found"
                        description="Try adjusting your filters or search keywords to find what you're looking for."
                     />
                  </div>
               )}
            </div>
         </div>
      </section>
   )
}

export default DonorSection
