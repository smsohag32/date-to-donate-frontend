
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";

export default function UserDashboardLayout() {

   return (
      <SidebarProvider>
         <AppSidebar className="!bg-white" />
         <SidebarInset className={""}>
            <TopBar />
            <div className="flex flex-1  shadow-sm flex-col ">
               <Outlet />
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
