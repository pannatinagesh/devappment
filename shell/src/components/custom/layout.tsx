import { cn } from '@/lib/utils'
import * as React from 'react'

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fadedBelow?: boolean
  fixedHeight?: boolean
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, fadedBelow = false, fixedHeight = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex h-full w-full flex-col',
        fadedBelow &&
          'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block',
        fixedHeight && 'md:h-svh',
        className
      )}
      {...props}
    />
  )
)
Layout.displayName = 'Layout'

const LayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'z-10 flex  h-[var(--header-height)] flex-none  items-center gap-2 ',
      className
    )}
    {...props}
  />
))
LayoutHeader.displayName = 'LayoutHeader'

interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  fixedHeight?: boolean
}

const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(
  ({ className, fixedHeight, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        className
      )}
      {...props}
    />
  )
)
LayoutBody.displayName = 'LayoutBody'

export { Layout, LayoutBody, LayoutHeader }

