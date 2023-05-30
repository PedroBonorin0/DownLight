"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useQueryService } from "@/hooks/useQueryService";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export function Form() {
  const ServiceSchema = z.object({
    name: z.string().min(4),
    price: z.string().min(1),
  });

  type ServiceData = z.infer<typeof ServiceSchema>;

  const { control, handleSubmit, reset } = useForm<ServiceData>({
    resolver: zodResolver(ServiceSchema),
  });

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
    <form className="flex items-end gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue=""
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="service-name"
            type="text"
            placeholder="Nome"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            forwardRef={ref}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="price"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="price"
            type="text"
            placeholder="Preço"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            forwardRef={ref}
          />
        )}
      />

      <div className="flex items-end gap-2">
        <Button text="Cadastrar" type="submit" disabled={isMutating} />
      </div>
    </form>
  );
}
