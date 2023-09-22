import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { z } from "zod";
export const bookingRouter = router({
  createBooking: publicProcedure
    .input(
      z.object({
        eventTypeId: z.number(),
        startTime: z.string(),
        endTime: z.string(),
        date: z.string(),
        userId: z.string(),
        hostName: z.string(),
        hostEmail: z.string(),
        participants: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const participantsData = input.participants.map((participantId) => ({
        userId: participantId,
      }));
      const booking = await db.booking.create({
        data: {
          userId: input.userId,
          date: input.date,
          startTime: input.startTime,
          eventTypeId: input.eventTypeId,
          endTime: input.endTime,
          hostName: input.hostName,
          hostEmail: input.hostEmail,
          participants: {
            create: participantsData,
          },
        },
      });
      const data1={userId:input.userId,  startTime:input.startTime,
        endTime:input.endTime,
        date:input.date};
        const data2 = participantsData.map(participant => {
          return {
            userId: participant.userId,
            startTime: input.startTime,
            endTime: input.endTime,
            date: input.date,
          };
        });
        data2.push(data1);
        console.log(data2);
      const reservation=await db.reservation.createMany({
        data:data1,
        skipDuplicates: true, 
      })
      console.log(reservation);
      if (!booking) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return booking;
    }),
  getUserBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await db.booking.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
  cancelBooking: publicProcedure
    .input(
      z.object({
        userId: z.string(), //get userid from usesession todo
        bookingId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedbookinguser = await db.bookingUser.deleteMany({
        where: {
          bookingId: input.bookingId,
        },
      });
      const deletedbooking = await db.booking.deleteMany({
        where: {
          userId: input.userId,
          id: input.bookingId,
        },
      });

      if (deletedbooking && deletedbookinguser)
        return { status: true, msg: "deleted booking successfully" };
      return { status: false, msg: "unable to delete" };
    }),
});
