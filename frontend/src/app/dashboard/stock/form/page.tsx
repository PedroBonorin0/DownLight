"use client";

import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icons";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function CreateProductForm() {
  const ProductSchema = z.object({
    name: z.string().min(4, "O nome deve conter no mínimo 4 letras"),
    price: z.coerce
      .number({ invalid_type_error: "Valor deve ser um número" })
      .nonnegative("Valor não pode ser negativo")
      .default(0),
    amount: z.coerce
      .number({ invalid_type_error: "Valor deve ser um número" })
      .nonnegative("Valor não pode ser negativo")
      .default(0),
  });

  type ProductData = z.infer<typeof ProductSchema>;

  const CreateProductForm = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
  });

  const { handleSubmit, reset } = CreateProductForm

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
    <div>
      <div className="mb-8 flex items-end gap-3">
        <h1 className=" flex items-center gap-5 text-3xl text-gray-700">
          <Icon icon="Stack" className="h-9 w-9 text-gray-500" />
          Estoque
          /
          Cadastro
        </h1>
      </div>
      <div className="mb-8 flex items-end gap-3">
        <h1 className=" flex items-center gap-5 text-3xl text-gray-700">
          <Icon icon="ArrowLeft" className="h-9 w-9 text-gray-500" />
        </h1>
      </div>

      <FormProvider {...CreateProductForm}>
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
            <Button text="Cadastrar" type="submit" disabled={isMutating} />
          </div>

        </form>
      </FormProvider>
    </div>
  );
}
