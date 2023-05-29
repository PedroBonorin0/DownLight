"use client";
import { Pencil } from "@/components/Icons/Pencil";
import { Trash } from "@/components/Icons/Trash";
import { useServiceStore } from "@/hooks/service-store";
import { Service } from "@/interfaces/Service";

interface Props extends Service {
  index: number;
}
export function TableRow({ id, name, price, index }: Props) {
  const action = useServiceStore((state) => state.setService);

  return (
    <tr key={id} className="odd:bg-gray-50">
      <td className="text-md whitespace-nowrap  rounded-lg px-6 py-4 font-medium text-gray-800">
        {index + 1}
      </td>
      <td className="text-md whitespace-nowrap px-6 py-4 text-gray-800">
        {name}
      </td>
      <td className="text-md whitespace-nowrap px-6 py-4 text-gray-800">
        R${price}
      </td>
      <td className="text-md whitespace-nowrap rounded-lg px-6 py-4 font-medium">
        <div className="flex justify-center gap-5 text-gray-500 ">
          <button
            className="cursor-pointer hover:text-blue-700"
            type="button"
            onClick={() => action(name, price.toString(), id)}
          >
            <Pencil />
          </button>
          <button className="cursor-pointer hover:text-red-700" type="button">
            <Trash />
          </button>
        </div>
      </td>
    </tr>
  );
}
