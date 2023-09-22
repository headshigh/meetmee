import { computersRouter } from "./computers";
import { router } from "../trpc";
import { bookingRouter } from "./booking";
import { timetableRouter } from "./timetable";
import { userRouter } from "./user";

import { eventTypeRouter } from "./eventType";

export const appRouter = router({
  computers: computersRouter,
  eventType: eventTypeRouter,
  booking: bookingRouter,
  timetable:timetableRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
