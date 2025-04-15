import appScreenshot from '@/assets/banner/app.webp';
import playStoreImage from "@/assets/banner/play-store.webp"

const AppBanner = () => {
   return (
      <div className="pb-24  pt-28  ">
         <div className="main-container z-30  relative rounded-2xl  p-8 bg-gradient-to-br from-[#FF2156] to-[#FF2156] w-full h-full min-h-[400px] flex items-center justify-center">
            {/* Background pattern for visual interest */}
            <div className="absolute inset-0  opacity-10">
               <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-rose-400"></div>
               <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-rose-800"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full gap-8 z-10">
               <div className="md:w-1/2 flex justify-center md:justify-center">
                  <div className="absolute hidden lg:block inset-0 -top-10 z-20">
                     {/* <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl transform -translate-y-4 translate-x-4"></div> */}
                     <img
                        src={appScreenshot || "/placeholder.svg"}
                        alt="Blood Donation App Screenshot"
                        className="w-full max-w-[420px] h-auto  relative z-10"
                     />
                  </div>
               </div>

               <div className="md:w-1/2 z-40 flex items-start flex-col justify-center space-y-5 text-white">
                  <h2 className="text-3xl md:text-4xl font-semibold text-center">Download Our App</h2>
                  <p className="max-w-md text-start text-white/90 text-lg">
                     Take the convenience of blood donation to the next level with our mobile app! Designed to make requesting
                     and donating blood easier than ever.
                  </p>
                  <div className="mt-6">
                     <button className="bg-white text-rose-700  cursor-pointer hover:bg-rose-50 px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H4a1 1 0 00-1 1v14zm9-12a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1zm-7 0a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1zm7 5a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1zm-7 0a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1zm7 5a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1zm-7 0a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                           />
                        </svg>
                        Download Now
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-[#FFFFFF]  absolute -bottom-5 -right-5 z-10 flex items-center justify-center p-3 rounded-full cursor-pointer">
               <img src={playStoreImage || "/placeholder.svg"} alt="Google Play Store" className="w-[100px]" />
            </div>
         </div>
      </div>
   )
}

export default AppBanner
