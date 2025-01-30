import { LucideIcon } from "lucide-react";
import { TooltipContent } from "@/components/ui/tooltip";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export type SidebarState = "expanded" | "collapsed";

export interface SidebarContext {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
  children?: React.ReactNode;
}

export interface SidebarMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  subItems?: MenuItem[];
}