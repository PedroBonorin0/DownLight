import { Product } from "@/interfaces/Product";
import { backend } from "@/lib/axios";
import { CurrencyFormatter } from "@/utils/CurrencyFormatter";
import { useQuery } from "@tanstack/react-query";

interface FormattedProduct extends Product {
  formattedPrice: string;
}

async function getProducts() {
  const { data } = await backend.get("products");

  const products: FormattedProduct[] = data.map((product: Product) => {
    return {
      ...product,
      formattedPrice: CurrencyFormatter.format(product.price),
    };
  });
  return products;
}

export function useQueryProduct() {
  return useQuery(["products"], () => getProducts(), {
    staleTime: 1000 * 60, // 1min
  });
}
