import { FormProvider, useForm } from "react-hook-form";
import Users from "./Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "zod";
import { userSchema } from "../types/schema";

const UsersProvider = () => {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(userSchema),
  });

  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
};

export default UsersProvider;
