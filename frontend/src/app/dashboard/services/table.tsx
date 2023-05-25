import { Button } from "@/components/Button";
import { Service } from "@/interfaces/Service";
import { backend } from "@/lib/axios";
import { deleteService } from "@/serverActions/services";
import Link from "next/link";

export async function Table() {
  const services: Service[] = (await backend.get("/services")).data;
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="border-b">
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
            Preco
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 "
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {services.map((service, index) => (
          <tr key={service.id} className="even:bg-slate-100">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
              {index + 1}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              {service.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              R${service.price}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
              <div className="flex">
                <Link replace href={`/dashboard/services?name=${service.name}&price=${service.price}`}><Button text="edit" color="green"/></Link>
                <Button text="delete" color="red"/>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
