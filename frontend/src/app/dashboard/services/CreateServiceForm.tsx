"use client";

import { Button } from "@/components/Button";
import { useQueryService } from "@/hooks/useQueryService";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Form } from "@/components/Form"

interface Props {
  close: () => void
}

export function CreateServiceForm({ close }: Props) {
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
      toast.success("Cadastro concluído com sucesso!", { delay: 0 });
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["services"], context?.previousTodos);
      toast.error(error?.data.message ?? "Ocorreu um erro!", { delay: 0 });
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
  }

  return (
    <FormProvider {...CreateServiceForm}>
      <form className="flex justify-between" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">

          <Form.Field>
            <Form.Label>Nome do serviço</Form.Label>
            <Form.Input name="name" className="w-64" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label>Preço</Form.Label>
            <Form.Input name="price" placeholder="00.00" />
            <Form.ErrorMessage field="price" />
          </Form.Field>
        </div>

        <div className="flex gap-4 mt-7">
          <Button text="Cancelar" type="button" color="gray" onClick={close} />
          <Button text="Cadastrar" type="submit" disabled={isMutating} />
        </div>

      </form>
    </FormProvider>
  );
}
