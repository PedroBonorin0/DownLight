import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="block text-sm font-medium leading-7 text-gray-800"
      {...props}
    />
  )
}