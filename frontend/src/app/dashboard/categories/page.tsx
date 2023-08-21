"use client";

import { Category } from "@/interfaces/Category";
import { Table } from "./Table";
import { RefetchButton } from "@/components/RefetchButton";
import { Input } from "@/components/Form/Input";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@/components/Icons";
import { NoData } from "@/components/NoData";
import { useQueryCategory } from "@/hooks/useQueryCategory";
import { CreateCategoryForm } from "./CreateCategoryForm";

export default function Category() {
  const { isFetching, isLoading, isRefetching, refetch, data: services } = useQueryCategory();

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
          <Icon icon="Tag" className="h-9 w-9 text-gray-500" />
          Categorias
        </h1>
        <RefetchButton loading={loading} refetch={refetch} />
      </div>

      {services?.length === 0 ?
        <NoData title="Nenhuma categoria" message="Adicione uma categoria para ela aparecer aqui.">
          <CreateCategoryForm />
        </NoData>
        :
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block w-full align-middle">

              <div className="w-3/5">

                <div className="flex justify-between">
                  <FormProvider {...SearchForm}>
                    <Input name="search" className="w-96" icon="Search" placeholder="Pesquisar" />
                  </FormProvider>
                  <CreateCategoryForm />
                </div>
              </div>

              <div className="mt-6 max-h-[660px] w-3/5 overflow-auto">
                <Table filter={searchField} />
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  );
}
