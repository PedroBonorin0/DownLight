"use client";

import { Service } from "@/interfaces/Service";
import { CreateServiceForm } from "./CreateServiceForm";
import { Table } from "./Table";
import { useQueryService } from "@/hooks/useQueryService";
import { ToastContainer } from "react-toastify";
import { RefetchButton } from "@/components/RefetchButton";
import { Input } from "@/components/Form/Input";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Icon } from "@/components/Icons";

export default function Service() {
  const { isFetching, isLoading, isRefetching, refetch } = useQueryService();

  const [createServiceFormVisibility, setCreateServiceFormVisibility] = useState(false)
  const loading = isFetching || isLoading || isRefetching;

  const SearchSchema = z.object({
    search: z.string()
  });

  type SearchData = z.infer<typeof SearchSchema>;

  const SearchForm = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
  });

  const searchField = SearchForm.watch("search")

  return (
    <div>
      <div className="mb-8 flex items-end gap-3">
        <h1 className=" flex items-center gap-5 text-4xl text-gray-700">
          <Icon icon="DocumentDuplicate" className="h-9 w-9 text-gray-500" />
          Serviços
        </h1>
        <RefetchButton loading={loading} refetch={refetch} />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block w-full align-middle">

            <div className="w-3/5">
              <div className="flex justify-between">
                <FormProvider {...SearchForm}>
                  <Input name="search" className="w-96" icon="Search" placeholder="Pesquisar" />
                </FormProvider>
                <Button text="Novo Serviço" type="button" onClick={() => setCreateServiceFormVisibility(true)} />
              </div>
              {createServiceFormVisibility &&
                <div className="border rounded p-3 bg-gray-100 mt-6">
                  <CreateServiceForm close={() => setCreateServiceFormVisibility(false)} />
                </div>
              }
            </div>
            <div className="mt-6 max-h-[660px] w-3/5 overflow-auto">
              <Table filter={searchField} />
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
