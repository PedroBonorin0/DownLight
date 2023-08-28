import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"


const buttonVariants = cva(
  "h-min flex justify-center rounded-md border px-3  py-[6px] text-sm font-medium leading-5  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 border-blue-600 text-white focus-visible:outline-blue-600 hover:bg-blue-700 hover:border-blue-700",
        green:
          "bg-emerald-600 border-emerald-600 text-white focus-visible:outline-emerald-600 hover:bg-emerald-700 hover:border-emerald-700",
        gray:
          "border-gray-300 text-gray-800 focus-visible:outline-gray-600 hover:bg-gray-100",
        red:
          "bg-red-600 border-red-600 text-white focus-visible:outline-red-600 hover:bg-red-700 hover:border-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={twMerge(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
