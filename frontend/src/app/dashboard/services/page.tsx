import Table from "./table";
import { Service } from "@/app/interfaces/Service";
import { backend } from "@/app/lib/axios";

export default async function Service() {
  const services = (await backend.get('/services')).data;

  const editService = async(sv: Service) => {
    'use server';
    
    await backend.put(`/services/${sv.id}`, {name: sv.name, price: sv.price});
  };

  return (
    <div>
      <h1 className="text-4xl mb-8">
        Serviços
      </h1>
      <div className="flex flex-col">
        <Table services={services} editService={editService}></Table>
      </div>
    </div>
  );
}
