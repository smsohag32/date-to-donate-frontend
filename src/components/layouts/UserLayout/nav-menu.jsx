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

export function NavMain({
   items,
}) {
   const location = useLocation();

   return (
      <SidebarGroup>
         <SidebarMenu>
            {items.map((item) => {
               const isActive =
                  location.pathname === item.url ||
                  item.items?.some((subItem) => location.pathname === subItem.url);

               return (
                  <Collapsible
                     key={item.title}
                     asChild
                     defaultOpen={isActive}
                     className="group/collapsible">
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           {item.items && item.items.length > 0 ? (
                              <SidebarMenuButton
                                 tooltip={item.title}
                                 className={`transition-colors cursor-pointer !py-[14px] duration-200 ${isActive
                                    ? "bg-[#FF2156] hover:bg-[#FF2156] text-[#FFFFFF] font-medium"
                                    : ""
                                    }`}>
                                 {item.icon && <item.icon />}
                                 <span>{item.title}</span>
                                 {item.items && item.items.length > 0 && (
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                 )}
                              </SidebarMenuButton>
                           ) : (
                              <NavLink to={item.url}>
                                 <SidebarMenuButton
                                    tooltip={item.title}
                                    className={`transition-colors cursor-pointer  duration-200 ${isActive
                                       ? "bg-[#FF2156] hover:bg-[#FF2156] hover:text-[#FFFFFF] text-[#FFFFFF] font-medium"
                                       : ""
                                       }`}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    {item.items && item.items.length > 0 && (
                                       <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    )}
                                 </SidebarMenuButton>
                              </NavLink>
                           )}
                        </CollapsibleTrigger>
                        {item.items && item.items.length > 0 && (
                           <CollapsibleContent>
                              <SidebarMenuSub>
                                 {item.items.map((subItem) => {
                                    // const isSubActive = location.pathname === subItem.url;
                                    return (
                                       <SidebarMenuSubItem key={subItem.title}>
                                          <SidebarMenuSubButton asChild>
                                             <NavLink
                                                to={subItem.url}
                                                className={({ isActive }) =>
                                                   `block w-full rounded-md px-2 py-3 text-sm transition-colors duration-200 ${isActive
                                                      ? "bg-[#FF2156] hover:bg-[#FF2156] text-[#FFFFFF] font-medium"
                                                      : ""
                                                   }`
                                                }>
                                                <span>{subItem.title}</span>
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
