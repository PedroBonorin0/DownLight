"use client";

import { Table } from "./Table";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { ToastContainer } from "react-toastify";
import { Button } from "@/components/Button";
import { RefetchButton } from "@/components/RefetchButton";
import { Icon } from "@/components/Icons";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/Form/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { NoData } from "@/components/NoData";

export default function Stock() {
  const { isFetching, isLoading, isRefetching, refetch, data: products } = useQueryProduct();

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
          <Icon icon="Stack" className="h-9 w-9 text-gray-500" />
          Estoque
        </h1>
        <RefetchButton loading={loading} refetch={refetch} />
      </div>
      {products?.length === 0 ?
        <NoData title="Nenhum produto" message="Adicione um produto para ele aparecer aqui.">
          <Link href={'dashboard/stock/form'}>
            <Button text="Novo Produto" type="button" />
          </Link>
        </NoData>
        :
        <>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block w-full align-middle">
                <div className="w-3/5 flex justify-between">
                  <FormProvider {...SearchForm}>
                    <Input name="search" className="w-96" icon="Search" placeholder="Pesquisar" />
                  </FormProvider>
                  <Link href={'dashboard/stock/form'}>
                    <Button text="Novo Produto" type="button" />
                  </Link>
                </div>
                <div className="mt-5 max-h-[660px] w-3/5 overflow-auto">
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
        </>
      }
    </div>
  );
}
