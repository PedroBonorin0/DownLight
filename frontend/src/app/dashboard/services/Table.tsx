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

export function Table() {
  const state = useServiceStore();
  const { data: services, isLoading, refetch } = useQueryService();

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
    await backend
      .delete(`/services/${serviceSelected.id}`)
      .catch((err) => alert(err.data.message))
      .then(() => {
        refetch();
      });
  }

  return (
    <>
      <table className="w-3/5 ">
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
        <tbody className="">
          {isLoading ? (
            <TableLoading />
          ) : (
            services?.map(({ id, name, price, formattedPrice }, index) => (
              <tr key={id} className="odd:bg-gray-50">
                <td className="text-md whitespace-nowrap  rounded-s-lg  font-medium text-gray-800">
                  {index + 1}
                </td>
                <td className="text-md whitespace-nowrap  text-gray-800">
                  {state.service.id === id ? (
                    <Input id="name" value={name} />
                  ) : (
                    name
                  )}
                </td>
                <td className="text-md whitespace-nowrap text-gray-800">
                  {state.service.id === id ? (
                    <Input id="price" value={price} />
                  ) : (
                    <Input id="price" value={formattedPrice} disabled />
                  )}
                </td>
                <td className="text-md whitespace-nowrap rounded-e-lg py-4 font-medium">
                  <div className="flex justify-center gap-5 text-gray-500 ">
                    {state.service.id === id ? (
                      <>
                        <button
                          className="cursor-pointer text-green-700 hover:text-green-500"
                          type="button"
                          onClick={() => state.clear()}
                        >
                          <Check />
                        </button>

                        <button
                          className="cursor-pointer hover:text-red-700"
                          type="button"
                          onClick={() => handleDeleteClick({ name, id })}
                        >
                          <Trash />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="cursor-pointer hover:text-blue-700"
                          type="button"
                          onClick={() =>
                            state.setService(name, price.toString(), id)
                          }
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
