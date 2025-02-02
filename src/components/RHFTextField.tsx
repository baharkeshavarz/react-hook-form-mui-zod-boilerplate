import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label" | "disabled">;
// Here we add the other attributes based on TextFieldProps

export function RHFTextField<T extends FieldValues>({
  name,
  ...props
}: RHFTextFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
