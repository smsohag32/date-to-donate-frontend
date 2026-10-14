
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function UserDashboardLayout() {
   return (
      <SidebarProvider className="bg-slate-50/70 text-slate-900 antialiased selection:bg-rose-500 selection:text-white">
         <AppSidebar />
         <SidebarInset className="min-h-screen flex flex-col bg-slate-50/60 overflow-x-hidden">
            <TopBar />
            <main className="flex-1 flex flex-col w-full">
               <Outlet />
            </main>
         </SidebarInset>
      </SidebarProvider>
   );
}

