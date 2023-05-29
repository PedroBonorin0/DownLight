import { Service } from "@/interfaces/Service";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { useQuery } from "react-query";

interface FormattedService extends Service {
  formattedPrice: string;
}

async function getServices() {
  const { data } = await backend.get("services");

  const services: FormattedService[] = data.map((service: Service) => {
    return {
      ...service,
      formattedPrice: CurrencyFormatter.format(service.price),
    };
  });
  return services;
}

export function useQueryService() {
  return useQuery(["services"], () => getServices(), {
    staleTime: 1000 * 60, // 1min
  });
}
