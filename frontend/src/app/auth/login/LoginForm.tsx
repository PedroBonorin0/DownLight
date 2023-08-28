"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Form } from "@/components/Form"
import { Button } from "@/components/Button";
import { useState } from "react";
import { Icon } from "@/components/Icons";

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  const signInSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
  });

  type signInData = z.infer<typeof signInSchema>;

  const SignInForm = useForm<signInData>({
    resolver: zodResolver(signInSchema),
  });

  const { handleSubmit } = SignInForm

  function onSubmit(data: signInData) {
    setLoading(true)
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }
  return (
    <FormProvider {...SignInForm}>


      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Form.Input name="email" />
          <Form.ErrorMessage field="email" />
        </Form.Field>

        <Form.Field>
          <Form.Label>Senha</Form.Label>
          <Form.Input name="password" type="password" />
          <Form.ErrorMessage field="password" />
        </Form.Field>

        <Button className="w-full">
          {loading
            ?
            <Icon icon="CircleNotch" className="animate-spin" />
            :
            "Entrar"
          }
        </Button>
      </form>
    </FormProvider>
  );
}
