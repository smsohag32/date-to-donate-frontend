import { useState, useRef, useEffect } from "react";
import { Maximize, Settings, LogOut } from "lucide-react";

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formatBreadcrumb } from "@/utils/format";
import { useDispatch } from "react-redux";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { logoutUser } from "@/redux-store/slices/auth-slice";
import useAuth from "@/hooks/useAuth";
import Logo from "@/assets/logo/Logo";
import LogoRegular from "@/assets/logo/LogoRegular";

const TopBar = () => {
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const profileRef = useRef(null);
   const location = useLocation();
   const { user } = useAuth();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [searchParams] = useSearchParams();
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (profileRef.current && !profileRef.current.contains(event.target)) {
            setIsProfileOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
      } else {
         document.exitFullscreen();
      }
   };

   const handleLogout = async () => {
      await dispatch(logoutUser());
   };

   const pathSegments = location.pathname.split("/").filter(Boolean);

   const goToProfile = () => {
      navigate("/dashboard/profile");
      setIsProfileOpen(false);
   };

   /** Build breadcrumb link with conditional search params */
   const buildLink = (href, segment) => {
      if (segment === "proposal") {
         const params = new URLSearchParams();
         const id = searchParams.get("id");
         const type = searchParams.get("type");

         // ✅ Only add if actual values exist
         if (id) params.set("id", id);
         if (type) params.set("type", type);

         // ✅ Return plain href if no valid query exists
         return params.toString() ? `${href}?${params.toString()}` : href;
      }
      return href;
   };

   console.log(user)

   return (
      <header className="flex h-17 sticky top-0 border-b z-50  bg-white rounded-[8px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
         <div className="flex justify-between w-full items-center gap-2 px-4">
            <div className="flex items-center">
               <SidebarTrigger className="-ml-1" />
               <Separator
                  orientation="vertical"
                  className="mr-2 h-4"
               />
               <div className="hidden lg:block">
                  <Breadcrumb>
                     <BreadcrumbList>
                        {pathSegments.map((segment, index) => {
                           const href = "/" + pathSegments.slice(0, index + 1).join("/");
                           const isLast = index === pathSegments.length - 1;
                           const linkWithSearch = buildLink(href, segment);

                           return (
                              <BreadcrumbItem key={href}>
                                 {isLast ? (
                                    <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                 ) : (
                                    <>
                                       <BreadcrumbLink href={linkWithSearch}>
                                          {formatBreadcrumb(segment)}
                                       </BreadcrumbLink>
                                       <BreadcrumbSeparator />
                                    </>
                                 )}
                              </BreadcrumbItem>
                           );
                        })}
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
               <div className=" flex lg:hidden items-center ml-4 lg:ml-6">
                  <Separator orientation="vertical" className={"h-10! mr-4"} />
                  <NavLink to="/" className="flex items-center  space-x-2">
                     <LogoRegular className="w-4" />   <p><span className="text-[#FF2156] tracking-tighter font-medium text-lg ">Dare </span>
                        <span className='text-[#595959] font-normal'>To</span>   <span className="text-[#FF2156] tracking-tighter font-medium text-lg ">  Donate</span></p>
                  </NavLink>
               </div>
            </div>

            <div className="flex items-center gap-3">

               <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Maximize className="h-5 w-5 text-gray-600 dark:text-gray-400" />
               </button>

               {/* Profile Dropdown */}
               <div
                  className="relative "
                  ref={profileRef}>
                  <button
                     onClick={() => setIsProfileOpen(!isProfileOpen)}
                     className="flex items-center  gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                     <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                        {user?.email?.slice(0, 2).toUpperCase() || "U"}
                     </div>
                  </button>

                  {isProfileOpen && (
                     <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                           <div className="flex items-center gap-3">
                              <div className=" w-10! p-2 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-semibold">
                                 {user?.email?.slice(0, 2).toUpperCase() || "U"}
                              </div>
                              <div>
                                 <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {user?.first_name || user?.email?.split("@")[0] || "User"}

                                 </p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email || "-"}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="py-2">
                           <button
                              onClick={goToProfile}
                              className="flex cursor-pointer items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <Settings className="h-4 w-4" />
                              Account Settings
                           </button>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                           <button
                              onClick={handleLogout}
                              className="flex items-center cursor-pointer gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              <LogOut className="h-4 w-4" />
                              Logout
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

export default TopBar;
