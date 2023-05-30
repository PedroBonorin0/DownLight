"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useQueryService } from "@/hooks/useQueryService";
import { backend } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export function Form() {
  const { refetch, isFetching } = useQueryService();

  const ServiceSchema = z.object({
    name: z.string().min(4),
    price: z.string().min(1),
  });

  type ServiceData = z.infer<typeof ServiceSchema>;

  const { control, handleSubmit } = useForm<ServiceData>({
    resolver: zodResolver(ServiceSchema),
  });

  async function onSubmit(data: ServiceData) {
    await backend
      .post("/services", {
        name: data.name,
        price: Number(data.price),
      })
      .catch((err) => alert(err.data.message))
      .then(() => {
        refetch();
      });
  }

  return (
    <form className="flex items-end gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue=""
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="service-name"
            type="text"
            placeholder="Nome"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            forwardRef={ref}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="price"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="price"
            type="text"
            placeholder="Preço"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            forwardRef={ref}
          />
        )}
      />

      <div className="flex items-end gap-2">
        <Button text="Cadastrar" type="submit" disabled={isFetching} />
      </div>
    </form>
  );
}
