"use client";
import { useQueryService } from "@/hooks/useQueryService";
import { useServiceStore } from "@/hooks/useServiceStore";
import { TableLoading } from "./TableLoading";
import { backend } from "@/lib/axios";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Service } from "@/interfaces/Service";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { useState } from "react";
import { Form } from '@/components/Form'
import { Icon } from "@/components/Icons";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog";
import { Button } from "@/components/Button";

interface Props {
  filter: string
}

export function Table({ filter }: Props) {
  const queryClient = useQueryClient();
  const state = useServiceStore();

  const [modalOpen, setModalOpen] = useState(false)
  function handleModalClose(open: boolean) {
    setModalOpen(open);
    !open && state.setServiceToDelete(null)
  }
  const { data: services, isLoading, refetch } = useQueryService();

  const filteredServices = services?.filter((service) => service.name.startsWith(filter))

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
      handleModalClose(false)
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
    name: z.string().min(4, "O nome deve conter no mínimo 4 letras"),
    price: z.coerce
      .number({ invalid_type_error: "Valor deve ser um número" })
      .nonnegative("Valor não pode ser negativo")
      .default(0)
  });

  type ServiceData = z.infer<typeof ServiceSchema>;

  const EditServiceForm = useForm<ServiceData>({
    resolver: zodResolver(ServiceSchema),
  });

  const { reset, setValue, handleSubmit } = EditServiceForm

  async function editService(data: Service) {
    state.clear();
    reset();
    await backend.put(`/services/${data.id}`, {
      name: data.name,
      price: Number(data.price),
    });
  }
  async function deleteService(id: string) {
    await backend.delete(`/services/${id}`);
  }

  async function onSubmit(data: ServiceData) {
    const formData = {
      id: state.service.id!,
      name: data.name,
      price: Number(data.price),
    };
    mutateEdit(formData);
  }

  function handleDeleteClick(name: string, id: string) {
    setModalOpen(true);
    state.setServiceToDelete({ name, id });
  }

  async function handleDeleteAction() {
    mutateDelete(state.serviceToDelete?.id!);
  }

  return (
    <>
      <div className="table w-full border rounded">
        <div className="table-header-group">
          <div className="table-row bg-gray-100">
            <div
              className="table-cell px-3 py-3 text-left text-xs font-bold uppercase text-gray-500 rounded-tl"
            >
              Nome do serviço
            </div>
            <div
              className="table-cell px-3 py-3 text-left text-xs font-bold uppercase text-gray-500 "
            >
              Preço
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
            filteredServices?.map(({ id, name, price, formattedPrice }) =>

              state.service.id === id ?
                (

                  <div key={id} className="table-row">

                    <FormProvider {...EditServiceForm}>
                      <div className="table-cell text-md whitespace-nowrap  text-gray-800 border-t">
                        <Form.Field className="p-3">
                          <Form.Label htmlFor="name">Nome do serviço</Form.Label>
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
                          {/* <Button text="Salvar" color="green" onClick={handleSubmit(onSubmit)} disabled={isEditing} /> */}

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

                    <div className="table-cell text-md whitespace-nowrap text-gray-800 border-t">
                      <div>{formattedPrice}</div>
                    </div>

                    <div className="table-cell text-md whitespace-nowrap px-1 py-4 font-medium border-t">
                      <div className="flex justify-center gap-5 text-gray-500 ">
                        <button
                          className="cursor-pointer hover:text-blue-700"
                          type="button"
                          onClick={() => {
                            setValue("price", price)
                            setValue("name", name)
                            state.setService(name, price.toString(), id);
                          }}
                        >
                          <Icon icon="Pencil" />
                        </button>

                        <button
                          className="cursor-pointer hover:text-red-700"
                          type="button"
                          onClick={() => handleDeleteClick(name, id)}
                        >
                          <Icon icon="Trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
          )}
        </div>
        <Dialog open={modalOpen} onOpenChange={handleModalClose} modal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deletar serviço</DialogTitle>
              <DialogDescription className="text-base">
                Tem certeza que deseja deletar o serviço {state.serviceToDelete?.name}?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter >
              <Button text="Deletar" color="red" onClick={handleDeleteAction} className="w-full" />
              <Button aria-label="Close" text="Cancelar" color="gray" className="w-full" onClick={() => handleModalClose(false)} />
            </DialogFooter>

          </DialogContent>
        </Dialog>
      </div >

    </>
  );
}
