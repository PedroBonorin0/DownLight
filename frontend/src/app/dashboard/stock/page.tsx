"use client";

import { Service } from "@/interfaces/Service";
import { Stack } from "@/components/Icons/Stack";
import { Form } from "./Form";
import { Table } from "./Table";
import { Loading } from "@/components/Icons/Loading";
import { useQueryService } from "@/hooks/useQueryService";
import { ToastContainer } from "react-toastify";

export default function Service() {
  const { isFetching, isLoading, isRefetching, refetch } = useQueryService();

  const loading = isFetching || isLoading || isRefetching;

  return (
    <div>
      <div className="mb-8 flex items-end gap-3">
        <h1 className=" flex items-center gap-5 text-4xl text-gray-700">
          <Stack className="h-9 w-9 text-gray-500" />
          Estoque
        </h1>
        <button type="button" onClick={() => refetch()} disabled={loading}>
          <Loading
            className={`mb-2 ml-2 h-4 w-4 text-gray-600 hover:cursor-pointer hover:text-black ${
              loading && "animate-spin hover:cursor-not-allowed "
            }`}
          />
        </button>
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
