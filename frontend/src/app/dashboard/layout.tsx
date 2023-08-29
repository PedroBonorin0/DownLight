"use client"
import { Icon } from "@/components/Icons";
import { MenuItem } from "@/components/MenuItem";
import { UserCard } from "@/components/UserCard";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <section className="flex">
      <aside className={twMerge(" transition-all duration-200 bg-gray-100 flex h-screen  flex-col justify-between border-r-[1px] border-gray-300",
        collapsed ? "w-20" : "w-80"
      )}>
        <div className="  h-full flex-col overflow-y-auto  px-4 py-7">
          <div>
            <div className="mb-6 flex">
              <img src="/mascot.svg" alt="" className="w-14" />

            </div>
            <ul className="font-medium">
              <li className="space-y-2">
                <MenuItem
                  title="Dashboard"
                  icon="Home"
                  href="/dashboard"
                  collapsed={collapsed}
                />
                <MenuItem
                  title="Funcionários"
                  icon="Users"
                  href="/dashboard/employees"
                  collapsed={collapsed}
                />
                <MenuItem
                  title="Estoque"
                  icon="Stack"
                  href="/dashboard/stock"
                  collapsed={collapsed}
                />
                <MenuItem
                  title="Serviços"
                  icon="DocumentDuplicate"
                  href="/dashboard/services"
                  collapsed={collapsed}
                />
                <MenuItem
                  title="Relatório"
                  icon="ChartPie"
                  href="/dashboard/report"
                  collapsed={collapsed}
                />
                <MenuItem
                  title="Configurações"
                  icon="Settings"
                  href="/dashboard/settings"
                  collapsed={collapsed}
                />
              </li>
            </ul>

          </div>
        </div>
        <div className="px-4 py-4 hover:cursor-pointer hover:bg-gray-100">

          <UserCard collapsed={collapsed} />

        </div>
      </aside>
      <button
        className={twMerge(
          "h-min w-min -ml-3 mt-8 cursor-pointer  border-2 rounded-full bg-gray-50 duration-300 transition-all",
          collapsed && "rotate-180"
        )
        }
        onClick={() => setCollapsed(state => !state)}
      >
        <Icon
          icon="ChevronLeft"
          className="h-5 w-5"
        />
      </button>

      <main className="m-10 w-full">{children}</main>
    </section>
  );
}
