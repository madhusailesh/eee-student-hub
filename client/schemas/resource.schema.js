import { z } from "zod";

export const resourceSchema = z.object({
  semester: z.string().min(1, "Semester is required"),
  subject: z.string().min(1, "Subject is required"),
  type: z.string().min(1, "Resource type is required"),
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
});