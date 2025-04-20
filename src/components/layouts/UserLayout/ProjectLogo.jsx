
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import LogoRegular from "@/assets/logo/LogoRegular";
import { Separator } from "@/components/ui/separator";

export function ProjectLogo() {
   return (
      <SidebarMenu>
         <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
               <LogoRegular className="w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
               <span className="truncate text-[16px] text-[#000000] font-normal">Dare to Donate</span>
            </div>
         </SidebarMenuButton>
         <Separator />
      </SidebarMenu>
   );
}
