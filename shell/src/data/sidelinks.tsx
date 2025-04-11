import Iconify from '@/components/custom/iconify'
export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}
export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const Usersidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <Iconify icon="vaadin:line-bar-chart" width={20} height={20} />,
  },
]

export const userData =  {
  user: {
    name: "Nagesh Pannati",
    email: "nagesh@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

