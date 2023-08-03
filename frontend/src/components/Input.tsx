import { ForwardedRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: FieldError;
  forwardRef?: ForwardedRef<HTMLInputElement>;
}

export function Input({ id, label, error, forwardRef, ...rest }: Props) {
  return (
    <div className="">
      {label && (
        <label
          htmlFor={id}
          className="block text-base font-medium leading-7 text-gray-800"
        >
          {label}
        </label>
      )}
      <div className="">
        <input
          ref={forwardRef}
          id={id}
          className={`${error
            ? "ring-red-400 focus:ring-red-600"
            : "ring-gray-300 focus:ring-blue-600"
            } bg-gray-100 text-base font-normal w-full rounded-md border-0 px-3 py-1 text-gray-900 shadow-sm outline-none ring-1  ring-inset placeholder:text-gray-400 focus:ring-2  focus:ring-inset disabled:bg-transparent disabled:shadow-none disabled:ring-0`}
          {...rest}
        />
        <span className="text-xs text-red-600">{error?.message}</span>
      </div>
    </div>
  );
}
