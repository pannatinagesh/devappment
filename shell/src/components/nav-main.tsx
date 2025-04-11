
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideLink } from "@/data/sidelinks"
import useCheckActiveNav from "@/hooks/use-check-active-nav"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { buttonVariants } from "./custom/button"

export function NavMain({ items }: { items: SideLink[] }) {
    const { checkActiveNav } = useCheckActiveNav()
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item: SideLink) => {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <Link
                                    to={item.href}
                                    aria-current={checkActiveNav(item.href) ? 'page' : undefined}>
                                    <SidebarMenuButton tooltip={item.title} className={cn(buttonVariants({ variant: checkActiveNav(item.href) ? 'primary' : 'outline', size: 'lg' }),
                                        'h-12 justify-start text-wrap rounded-none px-6 hover:bg-slate-100 hover:text-[#2545af]', checkActiveNav(item.href) ? `bg-slate-100 text-[#2545af]` : '',
                                    )}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
