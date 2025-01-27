import { Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { userSchema, Schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

const Users = () => {
  const { register } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(userSchema),
  });

  return (
    <Stack width={300} spacing={2}>
      <TextField {...register("name")} label="Name" />
      <TextField {...register("email")} label="Email" />
    </Stack>
  );
};

export default Users;
