
import { useState } from "react"
import { Search, X, Filter, SlidersHorizontal, MapPin, Users2, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import "aos/dist/aos.css"

import filterImage from "@/assets/icon/filter.png"
import DonorCard from "@/components/cards/DonorCard"
import { useGetDonorsQuery } from "@/redux-store/services/donor-api"
import { Button } from "@/components/ui/button"
import Loading from "@/components/skeleton/Loading"
import EmptyState from "@/components/Empty/Empty"
import { PaginationControls } from "@/components/pagination/PaginationControl"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const genders = ["All", "Male", "Female", "Other"]
const availabilityOptions = ["All", "Available", "On Break"]

const DonorSection = () => {
   const [searchText, setSearchText] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(false)
   const [selectedBloodGroup, setSelectedBloodGroup] = useState("All")
   const [selectedGender, setSelectedGender] = useState("All")
   const [availability, setAvailability] = useState("All")
   const [currentPage, setCurrentPage] = useState(0)

   const { data, isLoading, isFetching } = useGetDonorsQuery({
      page: currentPage,
      limit: 8,
      blood_group: selectedBloodGroup === "All" ? "" : selectedBloodGroup,
      searchText: searchText,
      gender: selectedGender === "All" ? "" : selectedGender,
      availability: availability,
   })

   const resetFilters = () => {
      setSelectedBloodGroup("All")
      setSelectedGender("All")
      setAvailability("All")
      setSearchText("")
      setCurrentPage(0)
   }

   const activeFilterCount = [
      selectedBloodGroup !== "All",
      selectedGender !== "All",
      availability !== "All",
      searchText !== ""
   ].filter(Boolean).length

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
               <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 max-w-5xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center gap-4">
                     <div className="relative flex-grow w-full group">
                        <span className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-rose-500 transition-colors">
                           <Search size={22} />
                        </span>
                        <input
                           onChange={(e) => setSearchText(e.target.value)}
                           value={searchText}
                           type="text"
                           className="w-full h-14 pl-14 pr-6 bg-slate-50/50 border-none rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-rose-500/20 transition-all text-slate-700 font-medium"
                           placeholder="Search by name, location, or area..."
                        />
                     </div>
                     
                     <div className="flex items-center gap-3 w-full lg:w-auto">
                        <motion.button
                           whileTap={{ scale: 0.95 }}
                           onClick={() => setIsFilterOpen(!isFilterOpen)}
                           className={`h-14 px-6 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all flex-grow lg:flex-grow-0 ${
                              isFilterOpen || activeFilterCount > 0
                                 ? "bg-rose-600 text-white shadow-lg shadow-rose-200"
                                 : "bg-slate-900 text-white hover:bg-slate-800"
                           }`}
                        >
                           <SlidersHorizontal size={20} />
                           <span>Filters</span>
                           {activeFilterCount > 0 && (
                              <span className="flex items-center justify-center bg-white text-rose-600 rounded-full w-5 h-5 text-[10px] ml-1">
                                 {activeFilterCount}
                              </span>
                           )}
                        </motion.button>
                        
                        {(activeFilterCount > 0) && (
                           <Button 
                              variant="ghost" 
                              onClick={resetFilters}
                              className="h-14 px-4 text-slate-400 hover:text-rose-600 font-bold"
                           >
                              <X size={20} />
                           </Button>
                        )}
                     </div>
                  </div>
               </div>

               {/* Advanced Filter Panel */}
               <AnimatePresence>
                  {isFilterOpen && (
                     <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="max-w-5xl mx-auto mt-6"
                     >
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-2xl shadow-rose-100/20 relative overflow-hidden">
                           {/* Decorative backgrounds */}
                           <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
                           
                           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                              {/* Blood Group Tabs */}
                              <div className="space-y-4 md:col-span-2 lg:col-span-3">
                                 <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-5 h-5 text-rose-500" />
                                    <label className="text-sm font-black uppercase tracking-wider text-slate-400">Blood Group Selection</label>
                                 </div>
                                 <Tabs value={selectedBloodGroup} onValueChange={setSelectedBloodGroup} className="w-full">
                                    <TabsList className="flex flex-wrap h-auto bg-slate-50 p-2 rounded-2xl gap-2">
                                       {bloodGroups.map((group) => (
                                          <TabsTrigger
                                             key={group}
                                             value={group}
                                             className="px-6 py-3 rounded-xl font-bold data-[state=active]:bg-rose-600 data-[state=active]:text-white transition-all"
                                          >
                                             {group}
                                          </TabsTrigger>
                                       ))}
                                    </TabsList>
                                 </Tabs>
                              </div>

                              {/* Gender Filter */}
                              <div className="space-y-4">
                                 <div className="flex items-center gap-2">
                                    <Users2 className="w-5 h-5 text-rose-500" />
                                    <label className="text-sm font-black uppercase tracking-wider text-slate-400">Gender</label>
                                 </div>
                                 <Select value={selectedGender} onValueChange={setSelectedGender}>
                                    <SelectTrigger className="h-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-700">
                                       <SelectValue placeholder="Any Gender" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                                       {genders.map(g => (
                                          <SelectItem key={g} value={g} className="font-medium rounded-xl focus:bg-rose-50 focus:text-rose-600">{g}</SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>

                              {/* Availability Filter */}
                              <div className="space-y-4">
                                 <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-rose-500" />
                                    <label className="text-sm font-black uppercase tracking-wider text-slate-400">Status</label>
                                 </div>
                                 <Select value={availability} onValueChange={setAvailability}>
                                    <SelectTrigger className="h-14 bg-slate-50 border-none rounded-2xl font-bold text-slate-700">
                                       <SelectValue placeholder="Any Status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                                       {availabilityOptions.map(opt => (
                                          <SelectItem key={opt} value={opt} className="font-medium rounded-xl focus:bg-rose-50 focus:text-rose-600">{opt}</SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>

                              {/* Quick Stats/Info */}
                              <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-100/50 flex flex-col justify-center">
                                 <p className="text-xs font-bold text-rose-400 uppercase mb-1">Active Filters</p>
                                 <div className="flex flex-wrap gap-2">
                                    {activeFilterCount === 0 ? (
                                       <span className="text-slate-400 text-sm font-medium">No filters applied</span>
                                    ) : (
                                       <>
                                          {selectedBloodGroup !== "All" && <Badge className="bg-rose-100 text-rose-600 border-none hover:bg-rose-200">{selectedBloodGroup}</Badge>}
                                          {selectedGender !== "All" && <Badge className="bg-rose-100 text-rose-600 border-none hover:bg-rose-200">{selectedGender}</Badge>}
                                          {availability !== "All" && <Badge className="bg-rose-100 text-rose-600 border-none hover:bg-rose-200">{availability}</Badge>}
                                          {searchText && <Badge className="bg-rose-100 text-rose-600 border-none hover:bg-rose-200">Search</Badge>}
                                       </>
                                    )}
                                 </div>
                              </div>
                           </div>

                           <div className="flex justify-end mt-10 pt-8 border-t border-slate-50 gap-4">
                              <Button variant="ghost" onClick={resetFilters} className="font-bold text-slate-400 hover:text-rose-600">
                                 Reset All
                              </Button>
                              <Button
                                 onClick={() => setIsFilterOpen(false)}
                                 className="bg-slate-900 hover:bg-slate-800 text-white px-10 rounded-2xl font-bold h-14 shadow-lg shadow-slate-200 transition-all"
                              >
                                 Show Donors
                              </Button>
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
