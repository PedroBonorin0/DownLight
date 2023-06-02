"use client";
import { Pencil } from "@/components/Icons/Pencil";
import { Trash } from "@/components/Icons/Trash";
import { useQueryService } from "@/hooks/useQueryService";
import { useServiceStore } from "@/hooks/useServiceStore";
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
import { Service } from "@/interfaces/Service";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";

export function Table() {
  const queryClient = useQueryClient();
  const state = useServiceStore();
  const { data: services, isLoading, refetch } = useQueryService();
  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    mutationKey: ["Service", "Edit"],
    mutationFn: editService,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["services"] });

      const previousTodos = queryClient.getQueryData(["services"]);

      queryClient.setQueryData(["services"], (old: any) => {
        const services = old?.map((service: Service) => {
          if (service.id === data.id) {
            return {
              id: data.id,
              name: data.name,
              price: data.price,
              formattedPrice: CurrencyFormatter.format(data.price),
            };
          }
          return service;
        });
        return services;
      });

      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Edição concluída com sucesso!", { delay: 0 });
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["services"], context?.previousTodos);
      toast.error(error?.data.message ?? "Ocorreu um erro!", { delay: 0 });
    },
    onSettled: async () => {
      await refetch();
    },
  });

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation({
    mutationKey: ["Service", "Delete"],
    mutationFn: deleteService,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["services"] });

      const previousTodos = queryClient.getQueryData(["services"]);

      queryClient.setQueryData(["services"], (old: any) => {
        const services = old.filter((service: Service) => service.id !== id);
        return services;
      });

      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Deleção concluída com sucesso!", { delay: 0 });
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(["services"], context?.previousTodos);
      toast.error(error?.data.message ?? "Ocorreu um erro!", { delay: 0 });
    },
    onSettled: async () => {
      state.clear();
      queryClient.invalidateQueries({ queryKey: ["services"] });
      //await refetch();
    },
  });

  const ServiceSchema = z.object({
    name: z.string().min(4),
    price: z.coerce.number().default(0),
  });

  type ServiceData = z.infer<typeof ServiceSchema>;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceData>({
    resolver: zodResolver(ServiceSchema),
  });

  async function editService(data: Service) {
    state.clear();
    await backend.put(`/services/${data.id}`, {
      name: data.name,
      price: Number(data.price),
    });
  }
  async function deleteService(id: string) {
    await backend.delete(`/services/${id}`);
  }

  async function onSubmit(data: ServiceData) {
    console.log(state.service);
    const formData = {
      id: state.service.id!,
      name: data.name,
      price: Number(data.price),
    };
    mutateEdit(formData);
  }
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceSelected, setServiceSelected] = useState({
    name: "",
    id: "",
  });

  function handleDeleteClick(selected: { name: string; id: string }) {
    setDeleteModalOpen(true);
    setServiceSelected(selected);
  }

  async function handleDeleteAction() {
    mutateDelete(serviceSelected.id);
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
              className="py-3 text-center text-xs font-bold uppercase text-gray-500"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <TableLoading />
          ) : (
            services?.map(({ id, name, price, formattedPrice }, index) => (
              <tr key={id} className="odd:bg-gray-50">
                <td className="text-md whitespace-nowrap rounded-s-lg  px-6  font-medium text-gray-800">
                  {index + 1}
                </td>
                <td className="text-md whitespace-nowrap  text-gray-800">
                  {state.service.id === id ? (
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
                  {state.service.id === id ? (
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
                <td className="text-md whitespace-nowrap rounded-e-lg px-3 py-4 font-medium">
                  <div className="flex justify-center gap-5 text-gray-500 ">
                    {state.service.id === id ? (
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
                            state.setService(name, price.toString(), id);
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
        title="Deletar serviço"
        description="Tem certeza que deseja deletar este serviço?"
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        serviceSelected={serviceSelected}
        deleteAction={handleDeleteAction}
      />
    </>
  );
}
