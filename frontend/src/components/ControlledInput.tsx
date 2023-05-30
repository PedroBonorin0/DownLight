import { Control, Controller, FieldValues } from "react-hook-form";
import { Input } from "./Input";

interface Props {
  control?: Control<any>;
  name: string;
  id: string;
  placeholder: string;
  defaultValue: string;
}

export function ControlledInput({
  control,
  id,
  name,
  placeholder,
  defaultValue,
}: Props) {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          forwardRef={ref}
        />
      )}
    />
  );
}
