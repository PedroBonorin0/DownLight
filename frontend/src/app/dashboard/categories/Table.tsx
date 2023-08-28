"use client";
import { backend } from "@/lib/axios";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Form } from '@/components/Form'
import { Icon } from "@/components/Icons";
import { useQueryCategory } from "@/hooks/useQueryCategory";
import { Category } from "@/interfaces/Category";
import { useCategoryStore } from "@/hooks/useCategoryStore";
import { TableLoading } from "./TableLoading";
import { toast } from "@/components/use-toast";
import { ToastAction } from "@/components/Toast";
import { DeleteModal } from "@/components/DeleteModal";

interface Props {
  filter: string
}

export function Table({ filter }: Props) {
  const queryClient = useQueryClient();
  const state = useCategoryStore();

  const [modalOpen, setModalOpen] = useState(false)

  function handleModalClose(open: boolean) {
    setModalOpen(open);
    !open && state.setCategoryToDelete(null)
  }
  const { data: categories, isLoading, refetch } = useQueryCategory();

  const filteredCategories = categories?.filter((category) => category.name.startsWith(filter ?? ""))

  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    mutationKey: ["Category", "Edit"],
    mutationFn: editCategory,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousTodos = queryClient.getQueryData(["categories"]);

      queryClient.setQueryData(["categories"], (old: any) => {
        const categories = old?.map((category: Category) => {
          if (category.id === data.id) {
            return {
              id: data.id,
              name: data.name
            };
          }
          return category;
        });
        return categories;
      });

      return { previousTodos };
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Categoria editada",
        action: (
          <ToastAction altText="Success!" className="border-0">
            <Icon icon="Check" className="text-emerald-500" />
          </ToastAction>
        )
      })
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["categories"], context?.previousTodos);
      toast({
        title: "Erro!",
        description: error?.data.message ?? "Ocorreu um erro!",
        variant: "destructive"
      })
    },
    onSettled: async () => {
      await refetch();
    },
  });

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation({
    mutationKey: ["Category", "Delete"],
    mutationFn: deleteCategory,
    onMutate: async (id) => {
      handleModalClose(false)
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousTodos = queryClient.getQueryData(["categories"]);

      queryClient.setQueryData(["categories"], (old: any) => {
        const categories = old.filter((category: Category) => category.id !== id);
        return categories;
      });

      return { previousTodos };
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Categoria deletada",
        action: (
          <ToastAction altText="Success!" className="border-0">
            <Icon icon="Check" className="text-emerald-500" />
          </ToastAction>
        )
      })
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["categories"], context?.previousTodos);
      toast({
        title: "Erro!",
        description: error?.data.message ?? "Ocorreu um erro!",
        variant: "destructive"
      })
    },
    onSettled: async () => {
      state.clear();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      //await refetch();
    },
  });

  const CategorySchema = z.object({
    name: z.string().min(4, "O nome deve conter no mínimo 4 letras"),
  });

  type CategoryData = z.infer<typeof CategorySchema>;

  const EditCategoryForm = useForm<CategoryData>({
    resolver: zodResolver(CategorySchema),
  });

  const { reset, setValue, handleSubmit } = EditCategoryForm

  async function editCategory(data: Category) {
    state.clear();
    reset();
    await backend.put(`/categories/${data.id}`, {
      name: data.name,
    });
  }
  async function deleteCategory(id: string) {
    await backend.delete(`/categories/${id}`);
  }

  async function onSubmit(data: CategoryData) {
    const formData = {
      id: state.category.id!,
      name: data.name,
    };
    mutateEdit(formData);
  }

  function handleDeleteClick(name: string, id: string) {
    setModalOpen(true);
    state.setCategoryToDelete({ name, id });
  }

  async function handleDeleteAction() {
    mutateDelete(state.categoryToDelete?.id!);
  }

  return (
    <div className="table w-full border rounded">
      <div className="table-header-group">
        <div className="table-row bg-gray-100">
          <div
            className="table-cell px-3 py-3 text-left text-xs font-bold uppercase text-gray-500 rounded-tl"
          >
            Nome da categoria
          </div>
          <div
            className="table-cell py-3 text-center text-xs font-bold uppercase text-gray-500 rounded-tr"
          >
            Ações
          </div>
        </div>
      </div>
      <div className="table-row-group">
        {isLoading ? (
          <TableLoading />
        ) : (
          filteredCategories?.map(({ id, name }) =>

            state.category.id === id ?
              (

                <div key={id} className="table-row">

                  <FormProvider {...EditCategoryForm}>
                    <div className="table-cell text-md whitespace-nowrap  text-gray-800 border-t">
                      <Form.Field className="p-3">
                        <Form.Label htmlFor="name">Nome da categoria</Form.Label>
                        <Form.Input name="name" className="" />
                        <Form.ErrorMessage field="name" />
                      </Form.Field>
                    </div>
                    <div className="table-cell text-md whitespace-nowrap px-3 font-medium border-t align-middle">
                      <div className="flex justify-center gap-5 text-gray-500  items-center">


                        <button
                          className="cursor-pointer text-green-700 hover:text-green-500 disabled:cursor-progress disabled:opacity-70"
                          type="button"
                          onClick={handleSubmit(onSubmit)}
                          disabled={isEditing}
                        >
                          <Icon icon="Check" />
                        </button>
                        {/* <Button text="Salvar" color="green" onClick={handleSubmit(onSubmit)} disabled={isEditing} /> */}

                        <button
                          className="cursor-pointer text-gray-500 hover:text-gray-600"
                          type="button"
                          onClick={() => {
                            state.clear();
                            reset();
                          }}
                        >
                          <Icon icon="X" />
                        </button>


                      </div>
                    </div>
                  </FormProvider>
                </div>
              )
              :
              (

                <div key={id} className="table-row">

                  <div className="table-cell text-md whitespace-nowrap text-gray-800 border-t">
                    <div className="px-3">{name}</div>
                  </div>

                  <div className="table-cell text-md whitespace-nowrap px-1 py-4 font-medium border-t">
                    <div className="flex justify-center gap-5 text-gray-500 ">
                      <button
                        className="cursor-pointer hover:text-blue-700"
                        type="button"
                        onClick={() => {
                          setValue("name", name)
                          state.setCategory(name, id);
                        }}
                      >
                        <Icon icon="Pencil" />
                      </button>

                      <button
                        className="cursor-pointer hover:text-red-700"
                        type="button"
                        onClick={() => handleDeleteClick(name, id)}
                      >
                        <Icon icon="Trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
        )}
      </div>
      <DeleteModal
        deleteAction={handleDeleteAction}
        description={`Tem certeza que deseja deletar a categoria ${state.categoryToDelete?.name}?`}
        onOpenChange={handleModalClose}
        open={modalOpen}
        title="Deletar categoria"
      />
    </div >
  );
}
