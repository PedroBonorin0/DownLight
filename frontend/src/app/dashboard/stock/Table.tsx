"use client";
import { Pencil } from "@/components/Icons/Pencil";
import { Trash } from "@/components/Icons/Trash";
import { useQueryProduct } from "@/hooks/useQueryProduct";
import { useProductStore } from "@/hooks/useProductStore";
import { TableLoading } from "./TableLoading";
import { DeleteModal } from "@/components/DeleteModal";
import { useState } from "react";
import { backend } from "@/lib/axios";
import { Input } from "@/components/Input";
import { Check } from "@/components/Icons/Check";
import { X } from "@/components/Icons/X";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "@/components/ControlledInput";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/interfaces/Product";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";

export function Table() {
  const queryClient = useQueryClient();
  const state = useProductStore();
  const { data: products, isLoading, refetch } = useQueryProduct();
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
    name: z.string().min(4),
    price: z.string().min(1),
    amount: z.string()
  });

  type ProductData = z.infer<typeof ProductSchema>;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
  });

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

  function handleDeleteClick(selected: { name: string; id: string }) {
    setDeleteModalOpen(true);
    setProductSelected(selected);
  }

  async function handleDeleteAction() {
    mutateDelete(productSelected.id);
  }

  return (
    <>
      <table className=" w-full ">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              Nome
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              Preço
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              Quantidade
            </th>
            <th
              scope="col"
              className="py-3 text-center text-xs font-bold uppercase text-gray-500"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="">
          {isLoading ? (
            <TableLoading />
          ) : (
            products?.map(({ id, name, price, amount, formattedPrice }, index) => (
              <tr key={id} className="odd:bg-gray-50">
                <td className="text-md whitespace-nowrap rounded-s-lg  px-6  font-medium text-gray-800">
                  {index + 1}
                </td>
                <td className="text-md whitespace-nowrap  text-gray-800">
                  {state.product.id === id ? (
                    <ControlledInput
                      id={name}
                      defaultValue={name}
                      placeholder="Name"
                      name="name"
                      control={control}
                    />
                  ) : (
                    <Input id="name" defaultValue={name} disabled />
                  )}
                </td>
                <td className="text-md whitespace-nowrap text-gray-800">
                  {state.product.id === id ? (
                    <ControlledInput
                      id={`${name}:price`}
                      defaultValue={price.toString()}
                      placeholder="Preço"
                      name="price"
                      control={control}
                    />
                  ) : (
                    <Input id="price" defaultValue={formattedPrice} disabled />
                  )}
                </td>
                <td className="text-md whitespace-nowrap text-gray-800">
                  {state.product.id === id ? (
                    <ControlledInput
                      id={`${name}:amount`}
                      defaultValue={amount.toString()}
                      placeholder="Preço"
                      name="amount"
                      control={control}
                    />
                  ) : (
                    <Input id="amount" defaultValue={amount} disabled />
                  )}
                </td>
                <td className="text-md whitespace-nowrap rounded-e-lg px-3 py-4 font-medium">
                  <div className="flex justify-center gap-5 text-gray-500 ">
                    {state.product.id === id ? (
                      <>
                        <button
                          className="cursor-pointer text-green-700 hover:text-green-500 disabled:cursor-progress disabled:opacity-70"
                          type="button"
                          onClick={handleSubmit(onSubmit)}
                          disabled={isEditing}
                        >
                          <Check />
                        </button>

                        <button
                          className="cursor-pointer text-gray-500 hover:text-gray-600"
                          type="button"
                          onClick={() => {
                            state.clear();
                            reset();
                          }}
                        >
                          <X />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="cursor-pointer hover:text-blue-700"
                          type="button"
                          onClick={() => {
                            state.setProduct(
                              name, price.toString(), amount, id);
                            reset();
                          }}
                        >
                          <Pencil />
                        </button>

                        <button
                          className="cursor-pointer hover:text-red-700"
                          type="button"
                          onClick={() => handleDeleteClick({ name, id })}
                        >
                          <Trash />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <DeleteModal
        title="Deletar produto"
        description="Tem certeza que deseja deletar este produto?"
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        itemSelected={productSelected}
        deleteAction={handleDeleteAction}
      />
    </>
  );
}
