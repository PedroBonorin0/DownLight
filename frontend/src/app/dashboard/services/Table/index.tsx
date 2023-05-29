import { Service } from "@/interfaces/Service";
import { backend } from "@/lib/axios";
import { TableRow } from "./TableRow";

export async function Table() {
  const services: Service[] = (await backend.get("/services")).data;

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
            Preco
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
        {services.map((service, index) => (
          <TableRow
            index={index}
            id={service.id}
            name={service.name}
            price={service.price}
            key={service.id}
          />
        ))}
      </tbody>
    </table>
  );
}
