"use client";

import { Service } from "@/interfaces/Service";
import { DocumentDuplicate } from "@/components/Icons/DocumentDuplicate";
import { Form } from "./Form";
import { Table } from "./Table";
import { Loading } from "@/components/Icons/Loading";
import { useQueryService } from "@/hooks/useQueryService";
import { ToastContainer } from "react-toastify";
import { RefetchButton } from "@/components/RefetchButton";

export default function Service() {
  const { isFetching, isLoading, isRefetching, refetch } = useQueryService();

  const loading = isFetching || isLoading || isRefetching;

  return (
    <div>
      <div className="mb-8 flex items-end gap-3">
        <h1 className=" flex items-center gap-5 text-4xl text-gray-700">
          <DocumentDuplicate className="h-9 w-9 text-gray-500" />
          Serviços
        </h1>
        <RefetchButton loading={loading} refetch={refetch} />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block w-full align-middle">
            <Form />
            <div className="mt-5 max-h-[660px] w-3/5 overflow-auto">
              <Table />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
