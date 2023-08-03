"use client";

import { ButtonHTMLAttributes } from "react";
import { Loading } from "./Icons/Loading";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: "green" | "blue" | "gray" | "red";
  onClick?: () => void;
  loading?: boolean;
  className?: string
}

export function Button({
  text,
  color = "blue",
  onClick,
  loading = false,
  className,
  ...rest
}: Props) {

  const buttonColors = {
    blue: "bg-blue-600 border-blue-600 text-white focus-visible:outline-blue-600 hover:bg-blue-700 hover:border-blue-700",
    green: "bg-emerald-600 border-emerald-600 text-white focus-visible:outline-emerald-600 hover:bg-emerald-700 hover:border-emerald-700",
    red: "bg-red-600 border-red-600 text-white focus-visible:outline-red-600 hover:bg-red-700 hover:border-red-700",
    gray: "border-gray-300 text-gray-800 focus-visible:outline-gray-600 hover:bg-gray-100",
  }

  return (
    <button
      {...rest}
      className={twMerge(buttonColors[color]
        , "h-min flex justify-center rounded-md border px-3  py-[6px] text-sm font-medium leading-5  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  disabled:cursor-not-allowed"
        , className)}
      onClick={onClick}

    >
      {loading && <Loading />}
      {text}
    </button>
  );
}
