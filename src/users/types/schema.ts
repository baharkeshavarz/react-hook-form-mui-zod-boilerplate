import { z } from "zod";
import { patterns } from "../../constants";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => patterns.email.test(text), {
      message: "Email not valid"
    }),
  states: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1), // like "2",
  skills: z.array(z.string()).max(2),
  registrationDateAndTime: z.date(),
  formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
  salaryRange: z.array(z.number()).min(2).max(2)
});

export type Schema = z.infer<typeof userSchema>;
/// The Type is now Schema:
// type Schema = {
//     name: string;
//     email: string;
// }

export const defaultValues: Schema = {
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000]
};
