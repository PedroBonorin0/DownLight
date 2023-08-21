
import { Category } from "@/interfaces/Category";
import { backend } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function getCategories() {
  const { data } = await backend.get("categories");

  const categories: Category[] = data
    
  return categories;
}

export function useQueryCategory() {
  return useQuery(["categories"], () => getCategories(), {
    staleTime: 1000 * 60, // 1min
  });
}
