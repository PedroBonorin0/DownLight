import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Icon, IconProps } from "../Icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  className?: string,
  icon?: IconProps
}

export function Input(props: InputProps) {
  const { register, formState: { errors } } = useFormContext()

  return (
    <label className="relative block">
      {props.icon &&
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
          <Icon icon={props.icon} className="w-5 h-5" />
        </span>
      }

      <input
        id={props.name}
        {...props}
        className={twMerge(errors[props.name]
          ? "ring-red-400 focus:ring-red-600"
          : "ring-gray-300 focus:ring-blue-600"
          , props.icon ? "pl-9" : "pl-3"
          , " bg-gray-100 text-base font-normal w-full rounded-md border-0 pr-3 py-1 text-gray-900 shadow-sm outline-none ring-1  ring-inset placeholder:text-gray-400 focus:ring-2  focus:ring-inset disabled:bg-transparent disabled:shadow-none disabled:ring-0"
          , props.className
        )}
        {...register(props.name)}

      />
    </label>
  );
}

