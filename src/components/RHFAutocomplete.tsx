import { Autocomplete, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";

type RHFAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: Option[];
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  label,
  options,
}: RHFAutocompleteProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value?.map((id: string) =>
            options.find((item) => item.id === id)
          )} // convert ['1', '2'] into [{id: "1", label: "Califonia"}, [{id: "2", label: "Texas"}]
          getOptionLabel={(option) =>
            options.find((item) => item.id === option.id)?.label ?? ""
          } // convert ['1', '2'] into ["Califonia", "Texas"]
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          onChange={(_, newValue) => {
            onChange(newValue?.map((item) => item.id));
          }}
          // convert [{id: "1", label: "Califonia"}, [{id: "2", label: "Texas"}] into  ['1', '2']
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
            />
          )}
          disableCloseOnSelect
          multiple
        />
      )}
    />
  );
}

export default RHFAutocomplete;
