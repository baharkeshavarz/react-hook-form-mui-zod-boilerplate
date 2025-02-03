import { z } from "zod";
import { patterns } from "../../constants";

// export const userSchema = z.object({
//   name: z.string().min(1, { message: "Required" }),
//   email: z
//     .string()
//     .min(1, { message: "Email is required" })
//     .refine((text) => patterns.email.test(text), {
//       message: "Email not valid"
//     }),
//   states: z.array(z.string()).min(1).max(2),
//   languagesSpoken: z.array(z.string()),
//   gender: z.string().min(1), // like "2",
//   skills: z.array(z.string()).max(2),
//   registrationDateAndTime: z.date(),
//   formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
//   salaryRange: z.array(z.number()).min(2).max(2),
//   isTeacher: z.boolean()
// });

// We want to create this one
// type Type1 = {};
// type Type2 = {};
// type Type3 = {};
// type Type4 = Type1 & { Type2 | Type3}

// یکسری داده ی مشترک داریم و برای بخش معلم
// دو حالت افزودن و  ویرایش دارم
// در ویرایش یک فیلد اضافه داریم بنام id

// intersection: add "and"
// discriminatedUnion: make update and add possible

export const userSchema = z
  .intersection(
    z.object({
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
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) })
    ]) // Here, edit has an extra felid, id
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(z.object({ name: z.string().min(4) }))
      })
    ])
  );

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
  salaryRange: [0, 2000],
  variant: "create",
  isTeacher: false
};
