import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

type RHFDateRangePickerProps<T extends FieldValues> = {
  name: Path<T>;
};

export function RHFDateRangePicker<T extends FieldValues>({
  name,
}: RHFDateRangePickerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            value={Array.isArray(value) ? value : [null, null]}
            {...restField}
          />
        </LocalizationProvider>
      )}
    />
  );
}
