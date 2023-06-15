"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export function Form() {
  const ProductSchema = z.object({
    name: z.string().min(4),
    price: z.string().min(1),
    amount: z.string().min(1)
  });

  type ProductData = z.infer<typeof ProductSchema>;

  const { control, handleSubmit, reset } = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
  });

  const queryClient = useQueryClient();
  const { refetch } = useQueryProduct();
  const { mutate, isLoading: isMutating } = useMutation({
    mutationKey: ["Product", "Create"],
    mutationFn: createProduct,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousTodos = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old: any) => [
        {
          ...newProduct,
          id: "new",
          formattedPrice: CurrencyFormatter.format(Number(newProduct.price)),
        },
        ...old,
      ]);

      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Cadastro concluído com sucesso!", { delay: 0 });
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["products"], context?.previousTodos);
      toast.error(error?.data.message ?? "Ocorreu um erro!", { delay: 0 });
    },
    onSettled: async () => {
      reset();
      await refetch();
    },
  });

  async function createProduct(data: ProductData) {
    await backend.post("/products", {
      name: data.name,
      price: Number(data.price),
      amount: Number(data.amount)
    });
  }

  async function onSubmit(data: ProductData) {
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
            id="product-name"
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
      <Controller
        defaultValue=""
        name="amount"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="amount"
            type="number"
            placeholder="Quantidade"
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
