import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

interface Props {
  icon : string,
  className?: string,
  color? : string,
  width? : number | string,
  height? : number | string,
  onClick?: (e?:any) => void,
  id?: string
}

export default function Iconify({ icon, className, onClick, id, ...other }: Props) {
  return  <Icon id={id} icon={icon} onClick={onClick} className={cn(className, onClick && 'cursor-pointer')} {...other} />
}
