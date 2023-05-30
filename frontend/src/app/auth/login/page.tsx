"use client";
import { signOut } from "next-auth/react";
import { Form } from "./Form";

interface Props {
  searchParams?: {
    status: string;
    cleared: boolean;
  };
}

export default function Login({ searchParams }: Props) {
  let sessionExpired = false;
  if (searchParams?.status === "AccessExpired") {
    sessionExpired = true;
  }
  if (searchParams?.status === "AccessExpired" && searchParams.cleared) {
    if (typeof window !== "undefined") {
      //waits the browser since the signOut function requires it (if not required but will throw a background error every time)

      signOut({ callbackUrl: "/auth/login?status=AccessExpired" });
    }
  }
  return (
    <div className="px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-48 w-auto rounded-full"
          src="/company.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {sessionExpired
            ? "Sua sessão expirou! Faça o login novamente"
            : "Faça login em sua conta"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xs">
        <Form />
        <div className="mt-10 text-sm">
          <a
            href="#"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Esqueceu a senha ?
          </a>
        </div>
      </div>
    </div>
  );
}
