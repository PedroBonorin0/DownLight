"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useServiceStore } from "@/hooks/service-store";
import { backend } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export function Form() {
  const service = useServiceStore((state) => state.service);
  const clear = useServiceStore((state) => state.clear);
  const [loading, setLoading] = useState(false);

  const ServiceSchema = z.object({
    name: z.string().min(4),
    price: z.string().min(1),
  });

  type ServiceData = z.infer<typeof ServiceSchema>;

  const { control, handleSubmit, reset } = useForm<ServiceData>({
    resolver: zodResolver(ServiceSchema),
  });

  async function onSubmit(data: ServiceData) {
    setLoading(true);
    if (service.id) {
      console.log("Editar");
    } else {
      console.log("Cadastrar");

      await backend
        .post("/services", {
          name: data.name,
          price: Number(data.price),
        })
        .catch((err) => alert(err.data.message));
    }
    setLoading(false);
  }

  useEffect(() => {
    reset({ name: service.name, price: service.price });
  }, [service]);

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
        <Button
          text="Salvar"
          type="submit"
          disabled={loading}
          loading={loading}
        />
        {service.name !== "" && (
          <Button text="Cancelar" color="gray" onClick={clear} type="button" />
        )}
      </div>
    </form>
  );
}
