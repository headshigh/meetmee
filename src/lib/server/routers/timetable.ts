import {z} from "zod"
import {publicProcedure, router} from "../trpc"
export const timetableRouter=router({
    createTimeTable : publicProcedure.input(z.object({
        userId:z.string(),
        sunday:z.string(),
        monday:z.string(),
        tuesday:z.string(),
        wenesday:z.string(),
        thursday:z.string(),
        friday:z.string(),
        saturday:z.string(),

    })).mutation(async ({ctx,input})=> {
        const timetable=db?.timetable.create({
            data:{
                userId:input.userId,
                Sunday:input.sunday,
                Monday:input.monday,
                Tuesday:input.tuesday,
                Wenesday:input.wenesday,
                Thursday:input.thursday,
                Friday:input.friday,
                Saturday:input.saturday,
            }
        })
        return timetable;
    }),
    getTimeTable:publicProcedure.input(z.object({userId:z.string()})).query(({ctx,input})=>{
        const timetable=db?.timetable.findFirst({
        where:{
            userId:input.userId
        }
        })
        return timetable ;
    })
})