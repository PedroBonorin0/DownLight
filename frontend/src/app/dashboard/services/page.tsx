import { Service } from "@/interfaces/Service";
import { Suspense } from "react";
import { Table } from "./table";
import { DocumentDuplicate } from "@/components/Icons/DocumentDuplicate";

export default function Service() {
  return (
    <div>
      <h1 className=" mb-8 flex items-center gap-5 text-4xl text-gray-700">
        <DocumentDuplicate className="h-9 w-9 text-gray-500" />
        Serviços
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block w-full p-1.5 align-middle">
              <div className="overflow-hidden">
                <Suspense fallback={<div>loading...</div>}>
                  {/* @ts-expect-error Async Server Component */}
                  <Table />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
