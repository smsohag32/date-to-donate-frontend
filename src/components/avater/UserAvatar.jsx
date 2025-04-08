"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, User, Settings, Bell } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"
import { logoutUser } from "@/redux-store/slices/auth-slice"
import { useDispatch } from "react-redux"

const UserAvatar = () => {
   const { user } = useAuth()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)
   const dispatch = useDispatch()
   // Get user initials for avatar fallback
   const getInitials = () => {
      if (!user?.name) return "U"
      return user.name
         .split(" ")
         .map((name) => name[0])
         .join("")
         .toUpperCase()
         .substring(0, 2)
   }

   const handleLogout = async () => {
      try {
         await dispatch(logoutUser())
      } catch (error) {
         console.error("Logout failed:", error)
      }
   }
   console.log(user, "user data")
   return (
      <div className="flex items-center gap-2">
         <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="relative cursor-pointer h-10 w-10 rounded-full p-0 text-white hover:bg-white/10">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                     <AvatarImage src={user?.profile_image || ""} alt={user?.name || "User"} />
                     <AvatarFallback className="bg-white/10 text-white">{getInitials()}</AvatarFallback>
                  </Avatar>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
               <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1.5 p-2">
                     <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                     <p className="text-xs leading-none text-muted-foreground">{user?.phone || ""}</p>
                  </div>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Dashboard</span>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}

export default UserAvatar

