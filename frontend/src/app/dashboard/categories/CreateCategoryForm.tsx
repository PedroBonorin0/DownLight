"use client";

import { Button } from "@/components/Button";

import { backend } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
//import { toast } from "react-toastify";
import { z } from "zod";
import { Form } from "@/components/Form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { useState } from "react";
import { useQueryCategory } from "@/hooks/useQueryCategory";
import { useToast } from "@/components/use-toast";
import { Icon } from "@/components/Icons";
import { ToastAction } from "@/components/Toast";

export function CreateCategoryForm() {
  const CategorySchema = z.object({
    name: z.string().min(4, "O nome deve conter no mínimo 4 letras"),
  });

  type CategoryData = z.infer<typeof CategorySchema>;

  const CreateCategoryForm = useForm<CategoryData>({
    resolver: zodResolver(CategorySchema),
  });

  const { reset, handleSubmit } = CreateCategoryForm;

  const queryClient = useQueryClient();
  const { refetch } = useQueryCategory();

  const { mutate, isLoading: isMutating } = useMutation({
    mutationKey: ["Category", "Create"],
    mutationFn: createCategory,
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousTodos = queryClient.getQueryData(["categories"]);

      queryClient.setQueryData(["categories"], (old: any) => [
        {
          name: newCategory.name,
          id: "new",
        },
        ...old,
      ]);

      return { previousTodos };
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Categoria cadastrada",
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
      reset();
      await refetch();
    },
  });

  async function createCategory(data: CategoryData) {
    await backend.post("/categories", {
      name: data.name,
    });
  }

  async function onSubmit(data: CategoryData) {
    mutate(data);
    handleModalClose();
  }
  const [modalOpen, setModalOpen] = useState(false)

  function handleModalClose() {
    setModalOpen(false)
  }

  const { toast } = useToast()

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen} modal>
      <DialogTrigger asChild>
        <Button text="Nova Categoria" type="button" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar categoria</DialogTitle>
          <DialogDescription >
            Adicione uma nova categoria para organizar seus produtos.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...CreateCategoryForm}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            <Form.Field>
              <Form.Label>Nome da categoria</Form.Label>
              <Form.Input name="name" />
              <Form.ErrorMessage field="name" />
            </Form.Field>


            <DialogFooter className="mt-2">
              <Button aria-label="Close" text="Cancelar" color="gray" onClick={handleModalClose} type="button" />
              <Button text="Cadastrar" type="submit" disabled={isMutating} />
            </DialogFooter>
          </form>
        </FormProvider>

      </DialogContent>
    </Dialog>
  )
}
