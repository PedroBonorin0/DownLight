import { MenuItem } from "@/components/MenuItem";
import { UserCard } from "@/components/UserCard";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <aside className="bg-gray-100 flex h-screen w-80 flex-col justify-between border-r-[1px] border-gray-300">
        <div className="  h-full flex-col overflow-y-auto  px-4 py-7">
          <div>
            <div className="mb-6 flex">
              <img src="/mascot.svg" alt="" className="w-14" />
            </div>
            <ul className="font-medium">
              <li className="space-y-2">
                <MenuItem title="Dashboard" icon="Home" href="/dashboard" />
                <MenuItem
                  title="Funcionários"
                  icon="Users"
                  href="/dashboard/employees"
                />
                <MenuItem
                  title="Estoque"
                  icon="Stack"
                  href="/dashboard/stock"
                />
                <MenuItem
                  title="Serviços"
                  icon="DocumentDuplicate"
                  href="/dashboard/services"
                />
                <MenuItem
                  title="Relatório"
                  icon="ChartPie"
                  href="/dashboard/report"
                />
                <MenuItem
                  title="Configurações"
                  icon="Settings"
                  href="/dashboard/settings"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-4 hover:cursor-pointer hover:bg-gray-100">
          <Suspense fallback={<div>loading...</div>}>
            {/* @ts-expect-error Async Server Component */}
            <UserCard />
          </Suspense>
        </div>
      </aside>

      <main className="m-10 w-full">{children}</main>
    </section>
  );
}
