'use client';

import { Service } from "@/app/interfaces/Service";
import { useState } from "react";

interface Props {
  services: Service[];
  editService: Function;
}

export default function Table(props: Props) {
  const servicesList = props.services.map((ser: Service, index: number) => {
    return (
      <tr key={ser.id} className="even:bg-slate-100">
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {index + 1}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {ser.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          R${ser.price}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <div
            className="flex"
          >
            <button onClick={() => props.editService(ser)} className="mr-1">edit</button>
            <button>delete</button>
          </div>
        </td>
      </tr>
    )
  });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >ID</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >Nome</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >Preco</th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  {servicesList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}