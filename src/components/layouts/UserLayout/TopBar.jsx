import { useState, useEffect } from "react";
import { Maximize2, Minimize2, Settings, LogOut, PhoneCall, Search, User, Home, Heart } from "lucide-react";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { formatBreadcrumb } from "@/utils/format";
import { useDispatch } from "react-redux";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { logoutUser } from "@/redux-store/slices/auth-slice";
import useAuth from "@/hooks/useAuth";
import LogoRegular from "@/assets/logo/LogoRegular";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
   const [isFullscreen, setIsFullscreen] = useState(false);
   const location = useLocation();
   const { user } = useAuth();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [searchParams] = useSearchParams();

   useEffect(() => {
      const handleFullscreenChange = () => {
         setIsFullscreen(Boolean(document.fullscreenElement));
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
   }, []);

   const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen().catch(() => {});
      } else {
         document.exitFullscreen().catch(() => {});
      }
   };

   const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate("/auth/login");
   };

   const pathSegments = location.pathname.split("/").filter(Boolean);

   /** Build breadcrumb link with conditional search params */
   const buildLink = (href, segment) => {
      if (segment === "proposal") {
         const params = new URLSearchParams();
         const id = searchParams.get("id");
         const type = searchParams.get("type");

         if (id) params.set("id", id);
         if (type) params.set("type", type);

         return params.toString() ? `${href}?${params.toString()}` : href;
      }
      return href;
   };

   const displayName = user?.name || user?.first_name || user?.email?.split("@")[0] || "User";
   const initials = displayName.slice(0, 2).toUpperCase();

   return (
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 md:px-6 backdrop-blur-md transition-all">
         {/* Left Side: Sidebar Trigger & Breadcrumbs / Mobile Logo */}
         <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors" />
            
            <Separator orientation="vertical" className="h-5 bg-slate-200 hidden sm:block" />

            {/* Desktop Breadcrumbs */}
            <div className="hidden lg:flex items-center">
               <Breadcrumb>
                  <BreadcrumbList className="text-xs text-slate-500 font-medium">
                     <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                           <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-rose-600 transition-colors">
                              <Home className="w-3.5 h-3.5" />
                              <span>Dashboard</span>
                           </Link>
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                     {pathSegments.slice(1).map((segment, index) => {
                        const href = "/" + pathSegments.slice(0, index + 2).join("/");
                        const isLast = index === pathSegments.length - 2;
                        const linkWithSearch = buildLink(href, segment);

                        return (
                           <BreadcrumbItem key={href}>
                              <BreadcrumbSeparator />
                              {isLast ? (
                                 <BreadcrumbPage className="font-semibold text-slate-800">
                                    {formatBreadcrumb(segment)}
                                 </BreadcrumbPage>
                              ) : (
                                 <BreadcrumbLink asChild>
                                    <Link to={linkWithSearch} className="hover:text-rose-600 transition-colors">
                                       {formatBreadcrumb(segment)}
                                    </Link>
                                 </BreadcrumbLink>
                              )}
                           </BreadcrumbItem>
                        );
                     })}
                  </BreadcrumbList>
               </Breadcrumb>
            </div>

            {/* Mobile Brand */}
            <div className="flex lg:hidden items-center ml-1">
               <NavLink to="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white shadow-sm">
                     <LogoRegular className="w-3.5 brightness-0 invert" />
                  </div>
                  <div className="flex items-baseline">
                     <span className="text-rose-600 font-bold text-sm">Dare</span>
                     <span className="text-slate-600 text-sm ml-0.5 font-medium">To</span>
                     <span className="text-rose-600 font-bold text-sm ml-0.5">Donate</span>
                  </div>
               </NavLink>
            </div>
         </div>

         {/* Right Side: Quick Search, Hotline, Fullscreen & Profile */}
         <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Find Donors Link */}
            <button
               onClick={() => navigate("/dashboard/find-donors")}
               className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-xs text-slate-600 hover:text-slate-900 transition-all border border-slate-200/60 shadow-xs cursor-pointer">
               <Search className="w-3.5 h-3.5 text-slate-400" />
               <span>Find Donors</span>
               <span className="ml-1 text-[10px] font-semibold bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">⌘K</span>
            </button>

            {/* Emergency Hotline Button */}
            <a
               href="tel:01540042699"
               className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100/90 text-xs font-semibold border border-rose-200/80 transition-colors shadow-xs">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
               </span>
               <PhoneCall className="w-3 h-3 text-rose-600" />
               <span className="hidden sm:inline">24/7 Hotline:</span>
               <span className="text-[11px] sm:text-xs font-bold tracking-tight">01540042699</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
               onClick={toggleFullscreen}
               title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
               aria-label="Toggle Fullscreen"
               className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer">
               {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
               ) : (
                  <Maximize2 className="h-4 w-4" />
               )}
            </button>

            <Separator orientation="vertical" className="h-6 bg-slate-200" />

            {/* Profile Dropdown */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                     <div className="relative">
                        <Avatar className="h-8 w-8 ring-2 ring-rose-500/20">
                           <AvatarImage
                              src={user?.profile_image || ""}
                              alt={displayName}
                              className="object-cover"
                           />
                           <AvatarFallback className="bg-gradient-to-tr from-rose-600 to-rose-500 text-white text-xs font-semibold">
                              {initials}
                           </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                     </div>
                     <span className="hidden md:inline-block text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                        {displayName}
                     </span>
                  </button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56 rounded-xl p-1.5 shadow-xl border-slate-200" align="end" sideOffset={8}>
                  <DropdownMenuLabel className="p-2 font-normal">
                     <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-2 ring-rose-500/20">
                           <AvatarImage
                              src={user?.profile_image || ""}
                              alt={displayName}
                           />
                           <AvatarFallback className="bg-gradient-to-tr from-rose-600 to-rose-500 text-white text-xs font-semibold">
                              {initials}
                           </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left leading-tight truncate">
                           <span className="text-xs font-semibold text-slate-900 truncate">{displayName}</span>
                           <span className="text-[11px] text-slate-400 truncate">{user?.email || "Donor"}</span>
                        </div>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                     onClick={() => navigate("/dashboard/profile")}
                     className="cursor-pointer px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50/70 transition-colors">
                     <User className="w-3.5 h-3.5 mr-2 text-slate-400" />
                     Account Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     onClick={() => navigate("/dashboard/find-donors")}
                     className="cursor-pointer px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50/70 transition-colors">
                     <Search className="w-3.5 h-3.5 mr-2 text-slate-400" />
                     Find Donors
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                     onClick={handleLogout}
                     className="cursor-pointer px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors">
                     <LogOut className="w-3.5 h-3.5 mr-2" />
                     Log Out
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
};

export default TopBar;

