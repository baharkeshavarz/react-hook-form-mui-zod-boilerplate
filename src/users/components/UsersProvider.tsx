import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Users from "./Users";
import { defaultValues, Schema, userSchema } from "../types/schema";

const UsersProvider = () => {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
};

export default UsersProvider;
