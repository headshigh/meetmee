import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteBooking, relatedBookingSchema } from "./index"

export const eventTypeSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullish(),
  hidden: z.boolean(),
  length: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteeventType extends z.infer<typeof eventTypeSchema> {
  user: CompleteUser
  Booking: CompleteBooking[]
}

/**
 * relatedeventTypeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedeventTypeSchema: z.ZodSchema<CompleteeventType> = z.lazy(() => eventTypeSchema.extend({
  user: relatedUserSchema,
  Booking: relatedBookingSchema.array(),
}))
