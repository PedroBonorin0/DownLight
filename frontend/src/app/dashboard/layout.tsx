import { ChartPie } from "@/components/Icons/ChartPie";
import { DocumentDuplicate } from "@/components/Icons/DocumentDuplicate";
import { Home } from "@/components/Icons/Home";
import { Settings } from "@/components/Icons/Settings";
import { Stack } from "@/components/Icons/Stack";
import { Users } from "@/components/Icons/Users";
import { MenuItem } from "@/components/MenuItem";
import { UserCard } from "@/components/UserCard";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <aside className="flex h-screen w-80 flex-col justify-between border-r-[1px] border-gray-200">
        <div className="  h-full flex-col overflow-y-auto  px-3 py-7">
          <div>
            <div className="mb-6 ml-3 flex">
              <img src="/mascot.svg" alt="" className="w-14" />
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <MenuItem title="Dashboard" icon={<Home />} />
                <MenuItem title="Funcionários" icon={<Users />} />
                <MenuItem title="Estoque" icon={<Stack />} />
                <MenuItem title="Serviços" icon={<DocumentDuplicate />} />
                <MenuItem title="Relatório" icon={<ChartPie />} />
                <MenuItem title="Configurações" icon={<Settings />} />
              </li>
            </ul>
          </div>
        </div>
        <div className="px-3 py-4 hover:cursor-pointer hover:bg-gray-100">
          <Suspense fallback={<div>loading...</div>}>
            {/* @ts-expect-error Async Server Component */}
            <UserCard />
          </Suspense>
        </div>
      </aside>
      <main className="m-10 w-full border-2 border-red-300 ">{children}</main>
    </section>
  );
}
