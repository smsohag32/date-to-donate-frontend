"use client"

import { useState } from "react"
import { Search, Filter, X, ChevronLeft, ChevronRight, Users, Droplets } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import DonorCard from "@/components/cards/DonorCard"
import { useGetDonorsQuery } from "@/redux-store/services/donor-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/skeleton/Loading"
import EmptyState from "@/components/Empty/Empty"

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const FindDonorsContainer = () => {
   const [searchText, setSearchText] = useState("")
   const [isFilterOpen, setIsFilterOpen] = useState(false)
   const [selectedBloodGroup, setSelectedBloodGroup] = useState("All")
   const [currentPage, setCurrentPage] = useState(1)

   const { data, isLoading, isFetching } = useGetDonorsQuery({
      page: currentPage,
      limit: 6,
      blood_group: selectedBloodGroup === "All" ? "" : selectedBloodGroup,
      searchText: searchText,
   })

   const resetFilters = () => {
      setSelectedBloodGroup("All")
      setSearchText("")
      setCurrentPage(1)
   }

   const handlePageChange = (page) => {
      setCurrentPage(page)
      window.scrollTo({
         top: document.getElementById("find-donors")?.offsetTop - 100 || 0,
         behavior: "smooth",
      })
   }

   const generatePaginationItems = () => {
      const totalPages = data?.data?.totalPages || 0
      if (totalPages <= 6) {
         return Array.from({ length: totalPages }, (_, i) => i + 1)
      } else {
         let pages = []
         pages.push(1)
         if (currentPage <= 3) {
            pages = [...pages, 2, 3, 4, "...", totalPages]
         } else if (currentPage >= totalPages - 2) {
            pages = [...pages, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
         } else {
            pages = [...pages, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
         }
         return pages
      }
   }

   const activeFiltersCount = selectedBloodGroup !== "All" ? 1 : 0

   return (
      <div id="find-donors" className="min-h-screen ">
         <div className="main-container py-4">
            {/* Header Section */}
            <div className="text-center ">
               <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-0">
                  <Droplets className="h-5 w-5 text-rose-600" />
                  <span className="text-sm font-medium text-rose-600">Blood Donor Search</span>
               </div>

            </div>

            {/* Search and Filter Bar */}
            <Card className="mb-6 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
               <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                     {/* Search Input */}
                     <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                           type="text"
                           placeholder="Search by name, blood group, or location..."
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           className="pl-10 h-12 border-gray-200 focus:border-rose-500 focus:ring-rose-500 bg-white"
                        />
                     </div>


                     {/* Filter Toggle Button */}
                     <Button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        variant={isFilterOpen ? "default" : "outline"}
                        className={`h-12 px-6 relative ${isFilterOpen
                           ? "bg-rose-600 hover:bg-rose-700 text-white"
                           : "border-gray-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                           }`}
                     >
                        <Filter className="h-5 w-5 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                           <Badge className="ml-2 bg-white text-rose-600 hover:bg-white text-xs px-1.5 py-0.5">
                              {activeFiltersCount}
                           </Badge>
                        )}
                     </Button>
                  </div>
                  <AnimatePresence>
                     {isFilterOpen && (
                        <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           transition={{ duration: 0.3 }}
                           className="overflow-hidden"
                        >
                           <Card className="border-none pt-6 pb-0 px-0 shadow-none">
                              <CardContent className="!p-0 my-0">
                                 <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                       <div className="w-1 h-8 bg-rose-500 rounded-full"></div>
                                       <div>
                                          <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
                                          <p className="text-sm text-gray-500">Refine your search to find the right donors</p>
                                       </div>
                                    </div>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => setIsFilterOpen(false)}
                                       className="text-gray-500 hover:text-gray-700"
                                    >
                                       <X className="h-5 w-5" />
                                    </Button>
                                 </div>

                                 {/* Blood Group Filter */}
                                 <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                       <Droplets className="h-5 w-5 text-rose-600" />
                                       <label className="text-sm font-medium text-gray-700">Blood Group</label>
                                    </div>

                                    <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
                                       {bloodGroups.map((group) => (
                                          <motion.div key={group} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                             <button
                                                onClick={() => setSelectedBloodGroup(group)}
                                                className={`w-full h-12 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${selectedBloodGroup === group
                                                   ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"
                                                   : "border-gray-200 bg-white text-gray-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                                                   }`}
                                             >
                                                {group}
                                             </button>
                                          </motion.div>
                                       ))}
                                    </div>

                                    {selectedBloodGroup !== "All" && (
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setSelectedBloodGroup("All")}
                                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-0 h-auto"
                                       >
                                          <X className="h-4 w-4 mr-1" />
                                          Clear blood group filter
                                       </Button>
                                    )}
                                 </div>

                                 {/* Action Buttons */}
                                 <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                    <div className="text-sm text-gray-500">
                                       {activeFiltersCount > 0 && `${activeFiltersCount} filter(s) applied`}
                                    </div>
                                    <div className="flex gap-3">
                                       <Button
                                          variant="outline"
                                          onClick={resetFilters}
                                          className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                                       >
                                          Reset All
                                       </Button>
                                       <Button
                                          onClick={() => setIsFilterOpen(false)}
                                          className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                                       >
                                          Apply Filters
                                       </Button>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </CardContent>
            </Card>

            {/* Filter Panel */}


            {/* Results Section */}
            {isLoading || isFetching ? (
               <Loading />
            ) : data?.data?.donors?.length > 0 ? (
               <>
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-16">
                     <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-600">
                           Found {data?.data?.totalDonors || 0} donors
                           {selectedBloodGroup !== "All" && ` with ${selectedBloodGroup} blood group`}
                        </span>
                     </div>
                     <div className="text-sm text-gray-500">
                        Page {currentPage} of {data?.data?.totalPages || 1}
                     </div>
                  </div>

                  {/* Donor Cards Grid */}
                  <motion.div
                     className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 gap-y-16 mb-8"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5 }}
                  >
                     {data?.data?.donors?.map((donor, index) => (
                        <motion.div
                           key={donor._id || index}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                        >
                           <DonorCard donor={donor} />
                        </motion.div>
                     ))}
                  </motion.div>

                  {/* Pagination */}
                  {data?.data?.totalPages > 1 && (
                     <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                        <CardContent className="p-4">
                           <div className="flex items-center justify-center space-x-2">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                 disabled={currentPage === 1}
                                 className="h-10 w-10 p-0"
                              >
                                 <ChevronLeft className="h-4 w-4" />
                              </Button>

                              {generatePaginationItems().map((page, index) => (
                                 <Button
                                    key={index}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => typeof page === "number" && handlePageChange(page)}
                                    disabled={page === "..."}
                                    className={`h-10 w-10 p-0 ${page === currentPage
                                       ? "bg-rose-600 hover:bg-rose-700 text-white"
                                       : page === "..."
                                          ? "cursor-default border-transparent"
                                          : "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                                       }`}
                                 >
                                    {page}
                                 </Button>
                              ))}

                              <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => currentPage < data?.data?.totalPages && handlePageChange(currentPage + 1)}
                                 disabled={currentPage === data?.data?.totalPages}
                                 className="h-10 w-10 p-0"
                              >
                                 <ChevronRight className="h-4 w-4" />
                              </Button>
                           </div>
                        </CardContent>
                     </Card>
                  )}
               </>
            ) : (
               <EmptyState
                  title="No Donors Found"
                  description="We couldn't find any donors matching your criteria. Try adjusting your filters or search terms."
               />
            )}
         </div>
      </div>
   )
}

export default FindDonorsContainer
