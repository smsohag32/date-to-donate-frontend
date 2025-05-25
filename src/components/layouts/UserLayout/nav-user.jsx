"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
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

   console.log("user", user);
   const handleLogout = async () => {
      console.log("logging out");
      await dispatch(logoutUser());
      navigate("/auth/login");
   };

   console.log(user)

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ring-0 outline-none">
                     <Avatar className="h-8 w-8 rounded-full bg-primary">
                        <AvatarImage
                           src={user?.profile_image || ""}
                           alt={user?.name}
                        />
                        <AvatarFallback className="rounded-full bg-primary text-white">
                           {user?.name?.slice(0, 2)}
                        </AvatarFallback>
                     </Avatar>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.email}</span>
                        <span className="truncate text-xs">{user?.phone}</span>
                     </div>
                     <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                     <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                           <AvatarImage
                              src={user?.profile_image || ""}
                              alt={user?.name}
                           />
                           <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">{user?.name}</span>
                           <span className="truncate text-xs">{user?.email}</span>
                        </div>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem>
                        <BadgeCheck />
                        Profile
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                     onClick={handleLogout}
                     className="cursor-pointer">
                     <LogOut />
                     Log out
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}
