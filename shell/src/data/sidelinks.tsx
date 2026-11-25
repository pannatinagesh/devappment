import Iconify from '@/components/custom/iconify'
import { JSX } from 'react/jsx-runtime'
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
  {
    title: 'Task',
    label: '',
    href: '/task',
    icon: <Iconify icon="vaadin:line-bar-chart" width={20} height={20} />,
  },
  {
    title: 'Upload Documents',
    label: '',
    href: '/upload',
    icon: <Iconify icon="akar-icons:cloud-upload" width={20} height={20} />,
  }
]

export const userData = {
  user: {
    name: "Nagesh Pannati",
    email: "nagesh@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

