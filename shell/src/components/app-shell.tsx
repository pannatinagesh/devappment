import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ChatBot from "@/pages/chatbot/ChatBot"
import { useState } from "react"
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './app-sidebar'
import { SiteHeader } from './site-header'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export default function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="m-0">
        <SiteHeader />
        <div id='content' className={`md:ml-54 overflow-x-hidden pt-16 bg-white  transition-[margin]  md:overflow-y-hidden md:pt-0 h-[91vh]`}>
          <Outlet />
        </div>
      </SidebarInset>
      <div className="fixed bottom-6 right-6">
        <Tooltip>
          <TooltipTrigger>
            <Avatar className="size-10 cursor-pointer" onClick={() => setOpen(true)}>
              <AvatarImage src={'/chatIcon.png'} alt="AVA" />
              <AvatarFallback>AVA</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow style={{ fill: '#001b71' }} />
            <p>Chat with AVA</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <ChatBot open={open} setOpen={setOpen} />
    </SidebarProvider>
  )
}
