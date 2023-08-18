"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function StockForm() {
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

  const { handleSubmit, reset, watch } = CreateProductForm

  const selectedCategories = watch("categories")

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

  const [modalOpen, setModalOpen] = useState(false)

  function handleModalClose() {
    setModalOpen(false)
  }

  return (

    <Dialog open={modalOpen} onOpenChange={setModalOpen} modal>
      <DialogTrigger asChild>
        <Button text="Novo Produto" type="button" />
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Criar produto</DialogTitle>
          <DialogDescription >
            Adicione um novo produto para usar em seus serviços.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...CreateProductForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">

              <Form.Field>
                <Form.Label>Nome do produto</Form.Label>
                <Form.Input name="name" />
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


              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Form.Label>Categorias</Form.Label>
                  <Popover>
                    <PopoverTrigger>
                      <Icon icon="Settings" className="text-gray-800 w-5 h-5 hover:text-gray-600 hover:cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-0">
                      <div className="flex flex-col ">
                        <span className="text-sm font-bold text-gray-800 p-4">
                          Aplique categorias para este produto
                        </span>
                        <div className="space-y-3 max-h-56 overflow-scroll p-4">


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
                        <div className="flex p-4 rounded-sm gap-3 items-center text-gray-600 text-sm hover:bg-gray-100 hover:cursor-pointer">
                          <Icon icon="Pencil" className="w-5 h-5" />
                          Editar categorias
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                </div>
                <div>
                  <div className="flex flex-wrap gap-3">

                    {selectedCategories.length < 1
                      ?
                      <span className="text-gray-500">Nenhuma categoria</span>
                      :
                      selectedCategories.map(category => (
                        <Badge key={category}>{categorias.find(item => item.id === category)?.name}</Badge>
                      ))}
                  </div>
                  <Form.ErrorMessage field="categories" />

                </div>
              </div>


            </div>
            <DialogFooter className="mt-6">
              <Button aria-label="Close" text="Cancelar" color="gray" onClick={handleModalClose} type="button" />
              <Button text="Salvar" type="submit" disabled={isMutating} className="mb-2" />
            </DialogFooter>
          </form>
        </FormProvider>

      </DialogContent>
    </Dialog>

  );
}
