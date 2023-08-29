"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, IconProps } from "./Icons";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";
import { useState } from "react";

interface Props {
  title: string;
  icon: IconProps;
  href: string;
  collapsed: boolean
}
export function MenuItem({ icon, title, href, collapsed }: Props) {
  const pathName = usePathname();

  const [open, setOpen] = useState(false)

  function handleOpen(open: boolean) {

    if (!collapsed) {
      setOpen(false)
    } else {
      setOpen(open)
    }
  }

  return (

    <Link
      href={href}
      className={
        twMerge(
          "group flex items-center rounded-lg py-2 hover:bg-gray-100 hover:text-blue-600",
          pathName === href ? "text-blue-600" : "text-gray-700 "
        )
      }
    >
      <div
        className={`${pathName === href ? "text-blue-600" : "text-gray-700 font-bold"
          } group-hover:text-blue-600`}
      >
        <TooltipProvider key={href} >
          <Tooltip open={open} onOpenChange={handleOpen} delayDuration={100}>
            <TooltipTrigger >
              <Icon icon={icon} className="w-8 h-8" />
            </TooltipTrigger>
            <TooltipContent side="right" align="end" sideOffset={10} >
              {title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>


      <span className={twMerge(" text-lg duration-200", collapsed ? "hidden" : "ml-3")}>{title}</span>

    </Link >


  );
}

