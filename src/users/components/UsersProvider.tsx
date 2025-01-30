import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues, Schema, userSchema } from "../types/schema";
import { DevTool } from "@hookform/devtools";
import Users from "./Users";

const UsersProvider = () => {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} placement="top-right" />
    </FormProvider>
  );
};

export default UsersProvider;
