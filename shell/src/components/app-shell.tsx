import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './app-sidebar'
import { SiteHeader } from './site-header'

export default function AppShell() {

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="m-0">
        <SiteHeader />
        <main id='content' className={`m-0 overflow-x-hidden pt-16 bg-[#E8E8E8]  transition-[margin]  md:overflow-y-hidden  md:pt-0 h-[91vh]`}>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
