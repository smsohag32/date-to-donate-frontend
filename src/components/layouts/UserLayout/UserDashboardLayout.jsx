import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import useAuth from "@/hooks/useAuth";
import { Header } from "./header";
import UserAvatar from "@/components/avater/UserAvatar";

export default function UserDashboardLayout() {
   const { user } = useAuth();
   return (
      <SidebarProvider>
         <AppSidebar className="!bg-white" />
         <SidebarInset className={""}>
            <Header className="flex h-16  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
               <div className="flex justify-between w-full items-center gap-2 px-4">
                  <div className="flex items-center">
                     <Breadcrumb>
                        <BreadcrumbList>
                           <BreadcrumbItem className="hidden md:block">
                              <BreadcrumbLink href="/">Home</BreadcrumbLink>
                           </BreadcrumbItem>
                           <BreadcrumbSeparator className="hidden md:block" />
                           <BreadcrumbItem>
                              <BreadcrumbPage>Profile</BreadcrumbPage>
                           </BreadcrumbItem>
                        </BreadcrumbList>
                     </Breadcrumb>
                  </div>

                  {/* <div className="">
                     <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                           <AvatarImage
                              src={user?.profile_image || ""}
                              alt="Abdul Hamid Khan Azad"
                           />
                           <AvatarFallback>{user?.email}</AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="text-title text-[14px]">Welcome, {user?.name ? user?.name : ""}</p>
                           <p className="text-des text-[12px]">{user?.email}</p>
                        </div>
                     </div>
                  </div> */}

                  <div className="lg:hidden">
                     <UserAvatar />
                  </div>
               </div>
            </Header>
            <div className="flex flex-1  shadow-sm flex-col ">
               <Outlet />
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
