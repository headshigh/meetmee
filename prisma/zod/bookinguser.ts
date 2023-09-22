import * as z from "zod"
import { CompleteBooking, relatedBookingSchema, CompleteUser, relatedUserSchema } from "./index"

export const bookingUserSchema = z.object({
  bookingId: z.number().int(),
  userId: z.string(),
})

export interface CompleteBookingUser extends z.infer<typeof bookingUserSchema> {
  booking: CompleteBooking
  user: CompleteUser
}

/**
 * relatedBookingUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBookingUserSchema: z.ZodSchema<CompleteBookingUser> = z.lazy(() => bookingUserSchema.extend({
  booking: relatedBookingSchema,
  user: relatedUserSchema,
}))
