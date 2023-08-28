
import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"



interface BadgeProps extends HTMLAttributes<HTMLDivElement> { }

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div className={
      twMerge(
        "flex  items-center rounded-xl border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "border-transparent bg-blue-500 text-gray-100 shadow hover:bg-blue-500/80",
        className
      )} {...props} />
  )
}


