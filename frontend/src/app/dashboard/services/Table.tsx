"use client";
import { Pencil } from "@/components/Icons/Pencil";
import { Trash } from "@/components/Icons/Trash";
import { useQueryService } from "@/hooks/useQueryService";
import { useServiceStore } from "@/hooks/useServiceStore";
import { TableLoading } from "./TableLoading";

export function Table() {
  const action = useServiceStore((state) => state.setService);
  const { data: services, isLoading } = useQueryService();

  return (
    <table className="mt-9 w-3/5 ">
      <thead className="">
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
            className="px-6 py-3  text-xs font-bold uppercase text-gray-500 "
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
              <td className="text-md whitespace-nowrap  rounded-s-lg px-6 py-4 font-medium text-gray-800">
                {index + 1}
              </td>
              <td className="text-md whitespace-nowrap px-6 py-4 text-gray-800">
                {name}
              </td>
              <td className="text-md whitespace-nowrap px-6 py-4 text-gray-800">
                {formattedPrice}
              </td>
              <td className="text-md whitespace-nowrap rounded-e-lg px-6 py-4 font-medium">
                <div className="flex justify-center gap-5 text-gray-500 ">
                  <button
                    className="cursor-pointer hover:text-blue-700"
                    type="button"
                    onClick={() => action(name, price.toString(), id)}
                  >
                    <Pencil />
                  </button>
                  <button
                    className="cursor-pointer hover:text-red-700"
                    type="button"
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
