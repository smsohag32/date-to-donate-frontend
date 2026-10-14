
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import LogoRegular from "@/assets/logo/LogoRegular";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function ProjectLogo() {
   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <SidebarMenuButton
               size="lg"
               asChild
               className="h-14 hover:bg-rose-50/60 transition-colors duration-200 group">
               <Link to="/" className="flex items-center gap-3">
                  <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                     <LogoRegular className="w-5 h-5 brightness-0 invert" />
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                     <div className="flex items-center gap-1">
                        <span className="font-bold text-base text-rose-600 tracking-tight">Dare</span>
                        <span className="font-normal text-base text-slate-600">To</span>
                        <span className="font-bold text-base text-rose-600 tracking-tight">Donate</span>
                     </div>
                     <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                        Donor Portal
                     </span>
                  </div>
               </Link>
            </SidebarMenuButton>
         </SidebarMenuItem>
      </SidebarMenu>
   );
}

