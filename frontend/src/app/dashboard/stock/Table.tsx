"use client";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { useProductStore } from "@/hooks/useProductStore";
import { TableLoading } from "./TableLoading";
import { DeleteModal } from "@/components/DeleteModal";
import { useState } from "react";
import { backend } from "@/lib/axios";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/interfaces/Product";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icons";

interface Props {
  filter: string
}

export function Table({ filter }: Props) {
  const queryClient = useQueryClient();
  const state = useProductStore();
  const { data: products, isLoading, refetch } = useQueryProduct();

  const filteredProducts = products?.filter(product => product.name.startsWith(filter))

  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    mutationKey: ["Product", "Edit"],
    mutationFn: editProduct,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousTodos = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old: any) => {
        const products = old?.map((product: Product) => {
          if (product.id === data.id) {
            return {
              id: data.id,
              name: data.name,
              price: data.price,
              amount: data.amount,
              formattedPrice: CurrencyFormatter.format(data.price),
            };
          }
          return product;
        });
        return products;
      });

      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Edição concluída com sucesso!", { delay: 0 });
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["products"], context?.previousTodos);
      toast.error(error?.data.message ?? "Ocorreu um erro!", { delay: 0 });
    },
    onSettled: async () => {
      state.clear();
      await refetch();
    },
  });

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation({
    mutationKey: ["Product", "Delete"],
    mutationFn: deleteProduct,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousTodos = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old: any) => {
        const products = old.filter((product: Product) => product.id !== id);
        return products;
      });

      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Deleção concluída com sucesso!", { delay: 0 });
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["products"], context?.previousTodos);
      toast.error(error?.data.message ?? "Ocorreu um erro!", { delay: 0 });
    },
    onSettled: async () => {
      state.clear();
      await refetch();
    },
  });

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

  const EditProductForm = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
  });

  const { handleSubmit, reset, setValue } = EditProductForm

  async function editProduct(data: Product) {
    await backend.put(`/products/${state.product.id}`, {
      name: data.name,
      price: Number(data.price),
      amount: Number(data.amount)
    });
  }
  async function deleteProduct(id: string) {
    await backend.delete(`/products/${id}`);
  }

  async function onSubmit(data: ProductData) {
    const formData = {
      id: state.product.id!,
      name: data.name,
      price: Number(data.price),
      amount: Number(data.amount),
    };
    mutateEdit(formData);
  }
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState({
    name: "",
    id: "",
  });

  function handleModalClose(open: boolean) {
    setDeleteModalOpen(open);
    !open && setProductSelected({
      name: "",
      id: "",
    })
  }

  function handleDeleteClick(selected: { name: string; id: string }) {
    setDeleteModalOpen(true);
    setProductSelected(selected);
  }

  async function handleDeleteAction() {
    mutateDelete(productSelected.id);
  }

  if (products?.length === 0) {
    return <div>no data</div>
  }

  return (
    <>
      <div className="table w-full border rounded">
        <div className="table-header-group">
          <div className="table-row bg-gray-100">
            <div
              className="table-cell px-3 py-3 text-left text-xs font-bold uppercase text-gray-500 rounded-tl"
            >
              Nome do produto
            </div>
            <div
              className="table-cell px-3 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              Preço
            </div>
            <div
              className="table-cell px-3 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              Quantidade
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
            filteredProducts?.map(({ id, name, price, formattedPrice, amount }) =>

              state.product.id === id ?
                (

                  <div key={id} className="table-row">

                    <FormProvider {...EditProductForm}>
                      <div className="table-cell text-md whitespace-nowrap  text-gray-800 border-t">
                        <Form.Field className="p-3">
                          <Form.Label htmlFor="name">Nome do produto</Form.Label>
                          <Form.Input name="name" className="" />
                          <Form.ErrorMessage field="name" />
                        </Form.Field>
                      </div>
                      <div className="table-cell text-md whitespace-nowrap text-gray-800 border-t">
                        <Form.Field className="p-3">
                          <Form.Label htmlFor="price">Preço</Form.Label>
                          <Form.Input name="price" className="w-3/4" />
                          <Form.ErrorMessage field="price" />
                        </Form.Field>
                      </div>
                      <div className="table-cell text-md whitespace-nowrap text-gray-800 border-t">
                        <Form.Field className="p-3">
                          <Form.Label htmlFor="amount">Quantidade</Form.Label>
                          <Form.Input name="amount" className="w-3/4" />
                          <Form.ErrorMessage field="amount" />
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

                    <div className="table-cell px-3 text-md whitespace-nowrap text-gray-800 border-t">
                      <div>{formattedPrice}</div>
                    </div>
                    <div className="table-cell px-3 text-md whitespace-nowrap text-gray-800 border-t">
                      <div>{amount}</div>
                    </div>

                    <div className="table-cell text-md whitespace-nowrap px-1 py-4 font-medium border-t">
                      <div className="flex justify-center gap-5 text-gray-500 ">
                        <button
                          className="cursor-pointer hover:text-blue-700"
                          type="button"
                          onClick={() => {
                            setValue("price", price)
                            setValue("name", name)
                            setValue("amount", amount)
                            state.setProduct(name, price.toString(), amount, id);
                          }}
                        >
                          <Icon icon="Pencil" />
                        </button>

                        <button
                          className="cursor-pointer hover:text-red-700"
                          type="button"
                          onClick={() => handleDeleteClick({ name, id })}
                        >
                          <Icon icon="Trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
          )}
        </div>
      </div >
      <DeleteModal
        title={"Deletar produto " + state.product?.name}
        description="Tem certeza que deseja deletar este produto?"
        open={deleteModalOpen}
        onOpenChange={handleModalClose}
        deleteAction={handleDeleteAction}
      />
    </>
  );
}
