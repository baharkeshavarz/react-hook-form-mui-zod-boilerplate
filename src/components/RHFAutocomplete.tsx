import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type RHFAutocompleteProps<T extends FieldValues> = {
  name: Path<T>; // Ensures `name` is a valid field key from the form schema
  label: string;
  options: Option[];
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  label,
  options,
}: RHFAutocompleteProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <Autocomplete
            options={options}
            value={value.map((id: string) =>
              options.find((item) => item.id === id)
            )} // convert ['1', '2'] into [{id: "1", label: "California"}, [{id: "2", label: "Texas"}]
            getOptionLabel={(option) =>
              options.find((item) => item.id === option.id)?.label ?? ""
            } // convert ['1', '2'] into ["California", "Texas"]
            isOptionEqualToValue={(option, newValue) =>
              option.id === newValue.id
            }
            //	Used to determine if the option represents the given value.
            onChange={(_, newValue) => {
              onChange(newValue.map((item) => item.id));
            }}
            // convert [{id: "1", label: "California"}, [{id: "2", label: "Texas"}] into  ['1', '2']
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
            renderOption={(props, option, { selected }) => (
              <Box component="li" {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option.label}
              </Box>
            )}
            disableCloseOnSelect
            multiple
          />
        );
      }}
    />
  );
}

export default RHFAutocomplete;
