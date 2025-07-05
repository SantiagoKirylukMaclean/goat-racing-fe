import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)} {...props} />
  )
}

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarSection({
  className,
  ...props
}: SidebarSectionProps) {
  return (
    <div
      className={cn("pb-8", className)}
      {...props}
    />
  )
}

interface SidebarTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarTitle({
  className,
  ...props
}: SidebarTitleProps) {
  return (
    <div
      className={cn("px-4 py-2", className)}
      {...props}
    />
  )
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({
  className,
  ...props
}: SidebarNavProps) {
  return (
    <div
      className={cn("grid gap-1 px-2", className)}
      {...props}
    />
  )
}

export interface SidebarNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  as?: React.ElementType;
}

export function SidebarNavItem({
  className,
  active,
  as: Component = "a",
  ...props
}: SidebarNavItemProps) {
  return (
    <Component
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
        active
          ? "bg-accent text-accent-foreground"
          : "transparent hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}
