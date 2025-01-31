import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type RHFRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options?: Option[];
};

export function RHFRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
}: RHFRadioGroupProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
    control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                label={option.label}
                control={<Radio checked={field.value === option.id} />}
              ></FormControlLabel>
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}
