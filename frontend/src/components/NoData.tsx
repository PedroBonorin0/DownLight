import { ReactNode } from "react"
import { Icon } from "./Icons"

interface Props {
  title: string,
  message: string,
  children: ReactNode
}

export function NoData({ message, title, children }: Props) {
  return (
    <div className="mt-36 items-center flex gap-6 flex-col justify-center">
      <Icon icon="EmptyFolder" className="w-28 h-28 opacity-50" />

      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="font-bold text-3xl text-gray-800">{title}</h2>
        <p className="text-xl text-gray-500">{message}</p>
      </div>
      {children}
    </div>
  )
}