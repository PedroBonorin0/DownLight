"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, IconProps } from "./Icons";

interface Props {
  title: string;
  icon: IconProps;
  href: string;
}
export function MenuItem({ icon, title, href }: Props) {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={`group flex items-center rounded-lg p-2  ${pathName === href ? "text-blue-600" : "text-gray-700 "
        } hover:bg-gray-100 hover:text-blue-600`}
    >
      <div
        className={`${pathName === href ? "text-blue-600" : "text-gray-700 font-bold"
          } group-hover:text-blue-600`}
      >
        <Icon icon={icon} />
      </div>
      <span className="ml-3">{title}</span>
    </Link>
  );
}
