import { createElement } from "react"
import { ChartPie } from "./ChartPie"
import { Check } from "./Check"
import { DocumentDuplicate } from "./DocumentDuplicate"
import { Home } from "./Home"
import { Loading } from "./Loading"
import { Pencil } from "./Pencil"
import { Save } from "./Save"
import { Search } from "./Search"
import { Settings } from "./Settings"
import { Stack } from "./Stack"
import { Trash } from "./Trash"
import { User } from "./User"
import { Users } from "./Users"
import { X } from "./X"
import { ArrowLeft } from "./ArrowLeft"
import { EmptyFolder } from "./EmptyFolder"
import { twMerge } from "tailwind-merge"

const CustomIcon = {
  ChartPie,
  Check,
  DocumentDuplicate,
  Home,
  Loading,
  Pencil,
  Save,
  Search,
  Settings,
  Stack,
  Trash,
  User,
  Users,
  X,
  ArrowLeft,
  EmptyFolder
}


export type IconProps = keyof typeof CustomIcon

interface Props {
  icon: IconProps
  className?: string
}
export function Icon({ icon, className }: Props) {
  return createElement(CustomIcon[icon], { className: twMerge("w-6 h-6", className) })
}