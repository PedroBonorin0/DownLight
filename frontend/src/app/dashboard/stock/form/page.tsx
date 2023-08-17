"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icons";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
    categories: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "Você deve selecionar no mínimo 1 categoria",
    }),
  });

  type ProductData = z.infer<typeof ProductSchema>;

  const CreateProductForm = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      categories: [],
    },
  });

  const { handleSubmit, reset } = CreateProductForm


  const categorias = [
    {
      id: "1",
      name: "categoria 1"
    },
    {
      id: "2",
      name: "categoria 2"
    },
    {
      id: "3",
      name: "categoria 3"
    },
    {
      id: "4",
      name: "categoria 3"
    },
    {
      id: "5",
      name: "categoria 3"
    },
    {
      id: "6",
      name: "categoria 3"
    },
    {
      id: "7",
      name: "categoria 3"
    }, {
      id: "8",
      name: "categoria 3"
    },
    {
      id: "9",
      name: "categoria 3"
    },
    {
      id: "10",
      name: "categoria 3"
    },
    {
      id: "11",
      name: "categoria 3"
    },
    {
      id: "12",
      name: "categoria 3"
    },
    {
      id: "13",
      name: "categoria 3"
    },
  ]



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
        <Link href="dashboard/stock" className=" flex items-center gap-5 text-3xl text-gray-700 hover:opacity-80">
          <Icon icon="ArrowLeft" className="h-9 w-9 " />
        </Link>
      </div>

      <FormProvider {...CreateProductForm}>
        <form className="flex gap-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">

            <Form.Field>
              <Form.Label>Nome do produto</Form.Label>
              <Form.Input name="name" className="w-96" />
              <Form.ErrorMessage field="name" />
            </Form.Field>

            <Form.Field>
              <Form.Label>Preço</Form.Label>
              <Form.Input name="price" placeholder="00.00" />
              <Form.ErrorMessage field="price" />
            </Form.Field>

            <Form.Field>
              <Form.Label>Quantidade</Form.Label>
              <Form.Input name="amount" />
              <Form.ErrorMessage field="amount" />
            </Form.Field>


            <Button text="Salvar" type="submit" disabled={isMutating} className="w-min" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-24">
              <Form.Label>Categorias</Form.Label>
              <Icon icon="Settings" className="text-gray-800 w-5 h-5 hover:text-gray-600 hover:cursor-pointer" />
            </div>
            <div>
              <div className="flex flex-col gap-3 h-64 overflow-y-scroll">
                {categorias.map(item => (
                  <div className="items-center flex space-x-3" key={item.id}>
                    <Controller
                      key={item.id}
                      name="categories"
                      control={CreateProductForm.control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            id={item.id}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        )
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
              <Form.ErrorMessage field="categories" />

            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
