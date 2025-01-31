import { Button, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useFormContext } from "react-hook-form";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { Schema } from "../types/schema";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateAndTimePicker } from "../../components/RHFDateAndTimePicker";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
// import { useEffect } from "react";

const Users = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useFormContext<Schema>();

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

  const submitForm: SubmitHandler<Schema> = (data) => {
    console.log("Submitted data::", data);
  };

  // useEffect(() => {
  //   const sub = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => sub.unsubscribe();
  // }, [watch]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack width={300} spacing={2}>
        {watch("name")}
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
          options={statesQuery?.data || []}
          name="states"
          label="Select States"
        />

        <RHFToggleButtonGroup<Schema>
          name="languagesSpoken"
          options={languagesQuery?.data || []}
        />
        <RHFRadioGroup<Schema>
          name="gender"
          label="Choose the Gender"
          options={gendersQuery?.data || []}
        />

        <RHFCheckbox<Schema>
          name="skills"
          label="Skills"
          options={skillsQuery?.data || []}
        />

        <RHFDateAndTimePicker<Schema>
          label="Registeration Date And Time"
          name="registerationDateAndTime"
        />
        <Typography>Former Employment Period:</Typography>
        <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Users;
