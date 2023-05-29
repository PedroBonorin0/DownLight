"use client";

import { ButtonHTMLAttributes } from "react";
import { Loading } from "./Icons/Loading";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: "green" | "blue" | "gray" | "red";
  onClick?: () => void;
  loading?: boolean;
}

export function Button({
  text,
  color = "blue",
  onClick,
  loading = false,
  ...rest
}: Props) {
  function getColor() {
    if (color === "blue") return "bg-blue-600 border-blue-600 text-white";

    if (color === "green")
      return "bg-emerald-600 border-emerald-600 text-white";

    if (color === "red") return "bg-red-600 border-red-600 text-white";

    if (color === "gray") return "border-gray-400 text-gray-400";
  }

  return (
    <button
      className={` ${getColor()} flex w-full justify-center rounded-md border-2 px-3  py-1 text-sm font-semibold leading-6  shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed`}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <>
          <Loading />
          Salvando...
        </>
      ) : (
        text
      )}
    </button>
  );
}
