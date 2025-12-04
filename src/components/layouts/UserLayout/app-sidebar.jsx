import { Users, User, Calendar, } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

import { NavMain } from "./nav-menu"
import { NavUser } from "./nav-user"
import { ProjectLogo } from "./ProjectLogo"

const data = {
   navMain: [
      {
         title: "Overview",
         url: "/dashboard",
         icon: User,
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
         title: "Donation Request",
         url: "/dashboard/donation_request",
         icon: Calendar,
      },

      {
         title: "Profile Settings",
         url: "/dashboard/profile",
         icon: User,
      },

   ],
}

export function AppSidebar({ ...props }) {
   return (
      <Sidebar collapsible="icon" variant="floating" className={""} {...props}>
         <SidebarHeader>
            <ProjectLogo />
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser />
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
