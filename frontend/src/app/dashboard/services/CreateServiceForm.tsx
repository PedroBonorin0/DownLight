"use client";


import { useQueryService } from "@/hooks/useQueryService";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/Form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { useState } from "react";
import { toast } from "@/components/use-toast";
import { ToastAction } from "@/components/Toast";
import { Icon } from "@/components/Icons";
import { Button } from "@/components/Button";


export function CreateServiceForm() {
  const ServiceSchema = z.object({
    name: z.string().min(4, "O nome deve conter no mínimo 4 letras"),
    price: z.coerce
      .number({ invalid_type_error: "Valor deve ser um número" })
      .nonnegative("Valor não pode ser negativo")
      .default(0)
  });

  type ServiceData = z.infer<typeof ServiceSchema>;

  const CreateServiceForm = useForm<ServiceData>({
    resolver: zodResolver(ServiceSchema),
  });

  const { reset, handleSubmit } = CreateServiceForm;

  const queryClient = useQueryClient();
  const { refetch } = useQueryService();
  const { mutate, isLoading: isMutating } = useMutation({
    mutationKey: ["Service", "Create"],
    mutationFn: createService,
    onMutate: async (newService) => {
      await queryClient.cancelQueries({ queryKey: ["services"] });

      const previousTodos = queryClient.getQueryData(["services"]);

      queryClient.setQueryData(["services"], (old: any) => [
        {
          ...newService,
          id: "new",
          formattedPrice: CurrencyFormatter.format(Number(newService.price)),
        },
        ...old,
      ]);

      return { previousTodos };
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Serviço cadastrado",
        action: (
          <ToastAction altText="Success!" className="border-0">
            <Icon icon="Check" className="text-emerald-500" />
          </ToastAction>
        )
      })
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["services"], context?.previousTodos);
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

  async function createService(data: ServiceData) {
    await backend.post("/services", {
      name: data.name,
      price: Number(data.price),
    });
  }

  async function onSubmit(data: ServiceData) {
    mutate(data);
    handleModalClose();
  }
  const [modalOpen, setModalOpen] = useState(false)

  function handleModalClose() {
    setModalOpen(false)
  }
  return (

    <Dialog open={modalOpen} onOpenChange={setModalOpen} modal>
      <DialogTrigger asChild>
        <Button type="button" >Novo Serviço</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar serviço</DialogTitle>
          <DialogDescription >
            Adicione um novo serviço para oferecer a seus clientes.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...CreateServiceForm}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            <Form.Field>
              <Form.Label>Nome do serviço</Form.Label>
              <Form.Input name="name" />
              <Form.ErrorMessage field="name" />
            </Form.Field>

            <Form.Field>
              <Form.Label>Preço</Form.Label>
              <Form.Input name="price" />
              <Form.ErrorMessage field="price" />
            </Form.Field>


            <DialogFooter className="mt-2">
              <Button aria-label="Close" variant="gray" onClick={handleModalClose} type="button" >Cancelar</Button>
              <Button type="submit" disabled={isMutating} >Cadastrar</Button>
            </DialogFooter>
          </form>
        </FormProvider>

      </DialogContent>
    </Dialog>
  )
}
