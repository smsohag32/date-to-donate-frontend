import { LayoutDashboard, Users, CalendarCheck, UserCog } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

import { NavMain } from "./nav-menu"
import { NavUser } from "./nav-user"
import { ProjectLogo } from "./ProjectLogo"

const data = {
   navMain: [
      {
         title: "Overview",
         url: "/dashboard",
         icon: LayoutDashboard,
      },
      {
         title: "Blood Donors",
         url: "/dashboard/find-donors",
         icon: Users,
         items: [
            {
               title: "Search Donors",
               url: "/dashboard/find-donors",
            },
            {
               title: "Upload Donors",
               url: "/dashboard/upload-donors",
            }
         ]
      },
      {
         title: "Donation Requests",
         url: "/dashboard/donation_request",
         icon: CalendarCheck,
      },
      {
         title: "Profile Settings",
         url: "/dashboard/profile",
         icon: UserCog,
      },
   ],
}

export function AppSidebar({ ...props }) {
   return (
      <Sidebar collapsible="icon" variant="floating" className="border-r border-slate-200/80 bg-white" {...props}>
         <SidebarHeader className="border-b border-slate-100/80 pb-3">
            <ProjectLogo />
         </SidebarHeader>
         <SidebarContent className="py-2">
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter className="border-t border-slate-100/80 pt-2">
            <NavUser />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}

