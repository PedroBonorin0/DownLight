'use server';

import { backend } from "@/lib/axios";
import { revalidatePath } from "next/cache";

export async function deleteService(id: string) {
  await backend.delete('/services/' + id);
  revalidatePath('/dashboard/services');
}