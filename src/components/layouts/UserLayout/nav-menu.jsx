"use client";

import { ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
   SidebarGroup,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({ items }) {
   const location = useLocation();

   const isItemActive = (item) => {
      return (
         location.pathname === item.url ||
         item.items?.some((subItem) => location.pathname === subItem.url)
      );
   };

   const isSubItemActive = (subItemUrl) => location.pathname === subItemUrl;

   // MAIN NAV ITEM
   const getMenuButtonStyles = (isActive) => {
      return cn(
         "group/button relative transition-all duration-300 ease-out transform py-4 cursor-pointer",
         "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20",
         "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20",
         "hover:text-primary hover:backdrop-blur-sm",
         "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
         "rounded-[8px] border border-transparent hover:border-primary/30",

         isActive && [
            "bg-gradient-to-r from-primary via-primary to-primary text-white font-semibold",
            "shadow-lg  hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-white shadow-primary/30 border-primary/30 scale-[1.02]",
            "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-primary",
         ]
      );
   };

   // SUBMENU TRIGGER ITEM
   const subMenuTrigger = (isActive) => {
      return cn(
         "group/button relative transition-all duration-300 ease-out transform py-4 cursor-pointer",
         "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20",
         "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20",
         "hover:text-primary hover:backdrop-blur-sm",
         "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
         "rounded-[8px] border border-transparent hover:border-primary/30",

         isActive && [
            "shadow-lg shadow-primary/30 border-primary/30 scale-[1.02]",
            "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-primary",
         ]
      );
   };

   // SUBMENU BUTTON
   const getSubMenuButtonStyles = (isActive) => {
      return cn(
         "block w-full rounded-[8px] cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
         "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 hover:text-primary",
         "hover:shadow-md hover:shadow-primary/10 hover:translate-x-1",
         "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
         "border border-transparent hover:border-primary/20 relative overflow-hidden",

         isActive && [
            "bg-gradient-to-r from-primary to-primary text-white font-semibold shadow-md shadow-primary/25",
            "hover:from-primary hover:text-white hover:to-primary/80 hover:shadow-lg hover:shadow-primary/35",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
            "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
         ]
      );
   };

   return (
      <SidebarGroup>
         <SidebarMenu className="space-y-2">
            {items.map((item) => {
               const isActive = isItemActive(item);
               const hasSubItems = item.items && item.items.length > 0;

               return (
                  <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           {hasSubItems ? (
                              <SidebarMenuButton tooltip={item.title} className={subMenuTrigger(isActive)}>
                                 {item.icon && (
                                    <item.icon className="h-5 w-5 shrink-0 transition-all duration-300 group-hover/button:scale-110" />
                                 )}
                                 <span className="truncate font-medium">{item.title}</span>
                                 <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-all duration-300 group-data-[state=open]/collapsible:rotate-90 group-hover/button:scale-110" />
                              </SidebarMenuButton>
                           ) : (
                              <NavLink to={item.url} className="block">
                                 <SidebarMenuButton tooltip={item.title} className={getMenuButtonStyles(isActive)}>
                                    {item.icon && (
                                       <item.icon className="h-5 w-5 shrink-0 transition-all duration-300 group-hover/button:scale-110" />
                                    )}
                                    <span className="truncate font-medium">{item.title}</span>
                                 </SidebarMenuButton>
                              </NavLink>
                           )}
                        </CollapsibleTrigger>

                        {hasSubItems && (
                           <CollapsibleContent className="overflow-hidden w-full data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                              <SidebarMenuSub className="space-y-1 mt-2 border-l-2 border-primary/30 px-4 w-full relative">
                                 {/* <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/40 rounded-full" /> */}

                                 {item.items.map((subItem) => {
                                    const subItemActive = isSubItemActive(subItem.url);
                                    return (
                                       <SidebarMenuSubItem key={subItem.title}>
                                          <SidebarMenuSubButton asChild>
                                             <NavLink to={subItem.url} className={getSubMenuButtonStyles(subItemActive)}>
                                                <span className="truncate relative z-10">{subItem.title}</span>
                                             </NavLink>
                                          </SidebarMenuSubButton>
                                       </SidebarMenuSubItem>
                                    );
                                 })}
                              </SidebarMenuSub>
                           </CollapsibleContent>
                        )}
                     </SidebarMenuItem>
                  </Collapsible>
               );
            })}
         </SidebarMenu>
      </SidebarGroup>
   );
}
