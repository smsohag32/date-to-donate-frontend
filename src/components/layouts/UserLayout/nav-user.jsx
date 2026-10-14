"use client";

import { ChevronsUpDown, LogOut, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from "@/components/ui/sidebar";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux-store/slices/auth-slice";
import useAuth from "@/hooks/useAuth";

export function NavUser() {
   const { isMobile } = useSidebar();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useAuth();

   const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate("/auth/login");
   };

   const displayName = user?.name || user?.first_name || user?.email?.split("@")[0] || "User";
   const initials = displayName.slice(0, 2).toUpperCase();

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-slate-100 hover:bg-slate-100/80 rounded-xl transition-colors ring-0 outline-none">
                     <div className="relative">
                        <Avatar className="h-9 w-9 rounded-full ring-2 ring-rose-500/20 shadow-sm">
                           <AvatarImage
                              src={user?.profile_image || ""}
                              alt={displayName}
                              className="object-cover"
                           />
                           <AvatarFallback className="rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white font-semibold text-xs">
                              {initials}
                           </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                     </div>
                     <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                        <span className="truncate font-semibold text-slate-800 text-xs">{displayName}</span>
                        <span className="truncate text-[11px] text-slate-400">{user?.email || user?.phone || "Donor"}</span>
                     </div>
                     <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-1.5 shadow-lg border-slate-200/80"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={8}>
                  <DropdownMenuLabel className="p-2 font-normal">
                     <div className="flex items-center gap-3 text-left">
                        <Avatar className="h-10 w-10 rounded-full ring-2 ring-rose-500/30">
                           <AvatarImage
                              src={user?.profile_image || ""}
                              alt={displayName}
                           />
                           <AvatarFallback className="rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white font-semibold text-sm">
                              {initials}
                           </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold text-slate-900">{displayName}</span>
                           <span className="truncate text-xs text-slate-500">{user?.email}</span>
                        </div>
                     </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                     onClick={() => navigate("/dashboard/profile")}
                     className="cursor-pointer px-3 py-2 rounded-lg text-slate-700 hover:text-rose-600 hover:bg-rose-50/60 transition-colors">
                     <User className="w-4 h-4 mr-2 text-slate-400 group-hover:text-rose-600" />
                     My Profile & Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                     onClick={() => navigate("/dashboard/find-donors")}
                     className="cursor-pointer px-3 py-2 rounded-lg text-slate-700 hover:text-rose-600 hover:bg-rose-50/60 transition-colors">
                     <Users className="w-4 h-4 mr-2 text-slate-400 group-hover:text-rose-600" />
                     Search Blood Donors
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                     onClick={handleLogout}
                     className="cursor-pointer px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-medium">
                     <LogOut className="w-4 h-4 mr-2" />
                     Log out
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}

