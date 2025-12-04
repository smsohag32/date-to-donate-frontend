import { Users, User, Calendar, History, MessageSquare, Bell, } from "lucide-react"

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
         title: "Profile",
         url: "/dashboard/profile",
         icon: User,
      },
      {
         title: "Find Donors",
         url: "/dashboard/find-donors",
         icon: Users,
      },
      {
         title: "Donation Request",
         url: "/dashboard/donation_request",
         icon: Calendar,
      },
      {
         title: "Donation History",
         url: "/donation-history",
         icon: History,
      },
      // {
      //    title: "Upcoming Donations",
      //    url: "/upcoming-donations",
      //    icon: Clock,
      // },
      // {
      //    title: "Impact Dashboard",
      //    url: "/impact",
      //    icon: Heart,
      // },
      // {
      //    title: "Achievements",
      //    url: "/achievements",
      //    icon: Award,
      // },
      {
         title: "Messages",
         url: "/messages",
         icon: MessageSquare,
      },
      {
         title: "Notifications",
         url: "/notifications",
         icon: Bell,
      },
      // {
      //    title: "Settings",
      //    url: "/settings",
      //    icon: Settings,
      // },
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
