import { z } from "zod";
import { patterns } from "../../constants";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => patterns.email.test(text), {
      message: "Email not valid",
    }),
});

console.log(userSchema);

export type Schema = z.infer<typeof userSchema>;
/// The Type is now Schema:
// type Schema = {
//     name: string;
//     email: string;
// }
