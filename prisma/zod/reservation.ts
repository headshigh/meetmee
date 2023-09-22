import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const reservationSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  date: z.string(),
})

export interface CompleteReservation extends z.infer<typeof reservationSchema> {
  user: CompleteUser
}

/**
 * relatedReservationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedReservationSchema: z.ZodSchema<CompleteReservation> = z.lazy(() => reservationSchema.extend({
  user: relatedUserSchema,
}))
