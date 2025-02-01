import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Slider, Typography } from "@mui/material";

type RHFSliderProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  min: number;
  max: number;
};

export function RHFSlider<T extends FieldValues>({
  name,
  label,
  min,
  max
}: RHFSliderProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay="auto" min={min} max={max} />
        </>
      )}
    />
  );
}
