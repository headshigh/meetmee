import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompleteeventType, relatedeventTypeSchema, CompleteBookingUser, relatedBookingUserSchema, CompleteBooking, relatedBookingSchema, Completetimetable, relatedtimetableSchema, CompleteReservation, relatedReservationSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  username: z.string(),
  password: z.string(),
  workingHours: z.string(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  eventType: CompleteeventType[]
  participating: CompleteBookingUser[]
  Booking: CompleteBooking[]
  timetable: Completetimetable[]
  Reservation: CompleteReservation[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  eventType: relatedeventTypeSchema.array(),
  participating: relatedBookingUserSchema.array(),
  Booking: relatedBookingSchema.array(),
  timetable: relatedtimetableSchema.array(),
  Reservation: relatedReservationSchema.array(),
}))
