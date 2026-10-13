
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { userData, Usersidelinks } from "@/data/sidelinks"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <a href="#">
                 <img src={"/logo.jpg"} width={30} height={30} />
                  <span className="text-base font-semibold">Devappment</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={Usersidelinks} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData.user} />
        </SidebarFooter>
      </Sidebar>
    )
  }