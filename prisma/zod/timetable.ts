import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const timetableSchema = z.object({
  userId: z.string(),
  Sunday: z.string(),
  Monday: z.string(),
  Tuesday: z.string(),
  Wenesday: z.string(),
  Thursday: z.string(),
  Friday: z.string(),
  Saturday: z.string(),
})

export interface Completetimetable extends z.infer<typeof timetableSchema> {
  user: CompleteUser
}

/**
 * relatedtimetableSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedtimetableSchema: z.ZodSchema<Completetimetable> = z.lazy(() => timetableSchema.extend({
  user: relatedUserSchema,
}))
