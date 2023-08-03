import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode,
  className?: string
}

export function Field(props: FieldProps) {
  return (
    <div {...props} className={twMerge(props.className, "flex flex-col gap-1 ")}  >{props.children}</div>
  )
}