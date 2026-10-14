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
         "group/button relative flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer outline-none",
         isActive
            ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold shadow-md shadow-rose-500/25"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 active:scale-[0.99]"
      );
   };

   // SUBMENU TRIGGER ITEM
   const subMenuTrigger = (isActive) => {
      return cn(
         "group/button relative flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer outline-none",
         isActive
            ? "bg-rose-50/80 text-rose-700 font-semibold"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 active:scale-[0.99]"
      );
   };

   // SUBMENU BUTTON
   const getSubMenuButtonStyles = (isActive) => {
      return cn(
         "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 cursor-pointer",
         isActive
            ? "bg-rose-500/10 text-rose-600 font-semibold border-l-2 border-rose-500 pl-2.5"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
      );
   };

   return (
      <SidebarGroup className="px-2">
         <SidebarMenu className="space-y-1.5">
            {items.map((item) => {
               const isActive = isItemActive(item);
               const hasSubItems = item.items && item.items.length > 0;

               return (
                  <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           {hasSubItems ? (
                              <SidebarMenuButton tooltip={item.title} className={subMenuTrigger(isActive)}>
                                 <div className="flex items-center gap-3">
                                    {item.icon && (
                                       <item.icon className={cn(
                                          "h-4 w-4 shrink-0 transition-transform duration-200 group-hover/button:scale-110",
                                          isActive ? "text-rose-600" : "text-slate-500"
                                       )} />
                                    )}
                                    <span className="truncate">{item.title}</span>
                                 </div>
                                 <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-slate-400" />
                              </SidebarMenuButton>
                           ) : (
                              <NavLink to={item.url} className="block">
                                 <SidebarMenuButton tooltip={item.title} className={getMenuButtonStyles(isActive)}>
                                    {item.icon && (
                                       <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/button:scale-110" />
                                    )}
                                    <span className="truncate">{item.title}</span>
                                 </SidebarMenuButton>
                              </NavLink>
                           )}
                        </CollapsibleTrigger>

                        {hasSubItems && (
                           <CollapsibleContent className="overflow-hidden w-full data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                              <SidebarMenuSub className="space-y-1 mt-1 ml-4 pl-3 border-l border-slate-200">
                                 {item.items.map((subItem) => {
                                    const subItemActive = isSubItemActive(subItem.url);
                                    return (
                                       <SidebarMenuSubItem key={subItem.title}>
                                          <SidebarMenuSubButton asChild>
                                             <NavLink to={subItem.url} className={getSubMenuButtonStyles(subItemActive)}>
                                                <span className="truncate">{subItem.title}</span>
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

