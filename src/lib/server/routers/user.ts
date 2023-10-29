// @ts-nocheck
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import z from "zod";
import { db } from "@/lib/db";
import { trpc } from "@/lib/trpc/client";

export const userRouter = router({
  getUserInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await db.user.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND",message:"user not found"});
      }
      return {
        username: user.username,
        name: user.name,
        image: user.image,
        workingHours: user.workingHours,
        id: user.id,
      };
    }),
    getUserReservations:publicProcedure.input(z.object({userId:z.string(),date:z.string()})).query(async ({input})=>{
      const reservations=await db.reservation.findMany({
        where:{
          userId:input.userId,
          date:input.date,
        }
        })
        return reservations.map(reservation=> {
          return {
            startTime:reservation.startTime,
            endTime:reservation.endTime
          }
      })
    }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
        workingHours: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input.workingHours);
      const user = db.user.create({
        data: {
          name: input.name,
          username: input.username,
          password: input.password,
          email: input.email,
          workingHours: input.workingHours,
        },
      });
      return user;
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const existinguser = await db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (!existinguser) {
        return {
          msg: "no user exists with that email",
          status: false,
          user: null,
        };
      } else {
        if (existinguser.password != input.password) {
          return {
            status: false,
            msg: "Incorrect password",
            user: null,
          };
        }
        return {
          status: true,
          msg: `logged in`,
          user: {
            name: existinguser.name,
            username: existinguser.username,
          },
        };
      }
    }),
  getUserWorikngHours: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await db.user.findUnique({
        where: {
          id: input.userId,
        },
      });
      if (!user)
        return new TRPCError({ code: "NOT_FOUND", message: "user not found" });
      return { workingHours: user.workingHours };
    }),
});
