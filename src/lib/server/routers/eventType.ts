import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";


export const eventTypeRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await db.computer.findMany();
    return result;
  }),
getPubllicPageEventtypes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const eventtypes = await db.eventType.findMany({
        where: {
          userId: input.userId,
          hidden: false,
        },
      });
      if (!eventtypes)
        throw new TRPCError({ code: "NOT_FOUND", message: "usernot found" });
      return eventtypes;
    }),
  getUserEventTypes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await db.eventType.findMany({
        where: {
          userId: input.userId,
        },
      });
      return result;
    }),
  getSingle: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await db.eventType.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
  hideEvent: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await db.eventType.update({
        where: {
          id: input.id,
        },
        data: {
          hidden: true,
        },
      });
      if (!updated)
        return new TRPCError({ code: "NOT_FOUND", message: "id not found" });
    }),
  unhideEvent: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await db.eventType.update({
        where: {
          id: input.id,
        },
        data: {
          hidden: false,
        },
      });
      if (!updated)
        return new TRPCError({ code: "NOT_FOUND", message: "id not found" });
    }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        hidden: z.boolean(),
        length: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.title.length == 0 || !input.length) {
        return {
          err: "necessary data not provided",
        };
      }
      const neweventtype = await db.eventType.create({
        data: {
          title: input.title,
          description: input.description,
          hidden: input.hidden,
          length: input.length,
          userId: input.userId,
        },
      });
      return neweventtype;
    }),
});
