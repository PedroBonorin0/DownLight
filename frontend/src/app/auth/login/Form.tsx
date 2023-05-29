"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../components/Input";
import { signIn } from "next-auth/react";

export function Form() {
  const signInSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
  });

  type signInData = z.infer<typeof signInSchema>;

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<signInData>({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: signInData) {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue=""
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="email"
            label="Endereço de email"
            error={errors.email}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            forwardRef={ref}
          />
        )}
      />

      <Controller
        defaultValue=""
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            id="password"
            label="Senha"
            error={errors.password}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            forwardRef={ref}
            type="password"
          />
        )}
      />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
