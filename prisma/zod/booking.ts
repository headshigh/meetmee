import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteeventType, relatedeventTypeSchema, CompleteBookingUser, relatedBookingUserSchema } from "./index"

export const bookingSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  eventTypeId: z.number().int(),
  date: z.string(),
  startTime: z.string(),
  hostName: z.string(),
  hostEmail: z.string(),
  endTime: z.string(),
  createdAt: z.date(),
  link: z.string().nullish(),
})

export interface CompleteBooking extends z.infer<typeof bookingSchema> {
  user: CompleteUser
  eventType: CompleteeventType
  participants: CompleteBookingUser[]
}

/**
 * relatedBookingSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBookingSchema: z.ZodSchema<CompleteBooking> = z.lazy(() => bookingSchema.extend({
  user: relatedUserSchema,
  eventType: relatedeventTypeSchema,
  participants: relatedBookingUserSchema.array(),
}))
