import { Button, Stack, TextField } from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { Option } from "../../types/option";
import { Schema } from "../types/schema";

const Users = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  const options: Option[] = [
    {
      id: "1",
      label: "Callifornia",
    },
    {
      id: "2",
      label: "Texas",
    },
    {
      id: "3",
      label: "Arizona",
    },
  ];

  const submitForm: SubmitHandler<Schema> = (data) => {
    console.log("Submitted data::", data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack width={300} spacing={2}>
        <TextField
          {...register("name")}
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("email")}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <RHFAutocomplete<Schema>
          options={options}
          name="states"
          label="Select States"
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Users;
