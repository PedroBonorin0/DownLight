import { Service } from "@/interfaces/Service";
import { Suspense } from "react";
import { Table } from "./table";
import { DocumentDuplicate } from "@/components/Icons/DocumentDuplicate";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Input } from "@/components/Input";

interface Props {
  searchParams?: {
    name: string;
    price: string;
  };
}

export default function Service({searchParams}: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className=" mb-8 flex items-center gap-5 text-4xl text-gray-700">
          <DocumentDuplicate className="h-9 w-9 text-gray-500" />
          Serviços
        </h1>
        <div className="flex items-center">
          <Input id="service-name" type="text" placeholder="Nome" value={searchParams?.name?? ''}/>
          <Input id="service-price" type="text" placeholder="Preço" value={searchParams?.price?? ''}/>
          <Button color="green" text={searchParams?.name? 'Edit' : 'Create'}/>
          <Link href={'dashboard/services'}><Button color="red" text="Cancel"/></Link>
        </div>
      </div>
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
