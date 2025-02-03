import { Fragment, useEffect } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch
} from "react-hook-form";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { defaultValues, Schema } from "../types/schema";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateAndTimePicker } from "../../components/RHFDateAndTimePicker";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFTextField } from "../../components/RHFTextField";
// import { useEffect } from "react";

const Users = () => {
  const { getValues, handleSubmit, control, unregister, reset } =
    useFormContext<Schema>();

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

  const isTeacher = useWatch({ control, name: "isTeacher" });
  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students"
  });
  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, unregister, replace]);

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container maxWidth="sm" onSubmit={handleSubmit(submitForm)}>
      <Stack width={300} spacing={2}>
        <RHFSwitch<Schema> label="Are you a teacher?" name="isTeacher" />
        {isTeacher && (
          <Button type="button" onClick={() => append({ name: "" })}>
            Add New Students
          </Button>
        )}

        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <RHFTextField
              label="Student Name"
              name={`students.${index}.name`}
            />
            <Button color="error" type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </Fragment>
        ))}

        <RHFTextField<Schema> name="name" label="Name" />
        <RHFTextField<Schema> name="email" label="Email" />

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
          label="Registration Date And Time"
          name="registrationDateAndTime"
        />
        <Typography>Former Employment Period:</Typography>
        <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
        <RHFSlider<Schema>
          name="salaryRange"
          label="Salary"
          min={getValues("salaryRange")[0]}
          max={getValues("salaryRange")[1]}
        />
      </Stack>
      <Stack display="flex" justifyContent="space-between" flexDirection="row">
        <Button variant="contained" type="submit">
          New User
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="error"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>
    </Container>
  );
};

export default Users;
