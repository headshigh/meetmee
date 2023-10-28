
"use client"
import React, { useState } from "react";
import divideTimeSlots from "../../modules/divideTimeSlots";
import { useMemo } from "react";
import classNames from "classnames";
import { trpc } from "@/lib/trpc/client";
import { availableParallelism } from "os";
import { getDayOfWeek } from '../../modules/getDayOfWeek';
import { Day } from "react-day-picker";
type setStartTime = (time: string) => void;
function SetMeetingTime({
  setStartTime,
  date,
  setEndTime,
  length,
}: {
  setStartTime: setStartTime;
  setEndTime: setStartTime;
  date:string;
  length: string;
}) {
  //get users workstart and endtime and set accordingly
  let day=(new Date(date).getDay());
  const { data } = trpc.user.getUserWorikngHours.useQuery({
    userId: "clmq8xng60000uvd08fuz8uq1",
  });
  const {data:timetable,isLoading}=trpc.timetable.getTimeTable.useQuery({
    userId:"clmq8xng60000uvd08fuz8uq1",
  })
  console.log(timetable);
  const {data:reservations}=trpc.user.getUserReservations.useQuery({
    userId:"clmq8xng60000uvd08fuz8uq1",
    date:date,
  })
  const dayMapping={
    "0":"Sunday",
    "1":"Monday",
    "2":"Tuesday",
    "3":"Wenesday",
    "4":"Thursday",
    "5":"Friday",
    "6":"Saturday",
  }
  const dayMapping2={
    "Sunday":"0",
    "Monday":"1",
    "Tuesday":"2",
    "Wenesday":"3",
    "Thursday":"4",
    "Friday":"5",
    "Saturday":"6"
  }
console.log(timetable);
//@ts-expect-error
const weekday=dayMapping[day];
//@ts-expect-error
const workinghours= timetable[weekday];
console.log(workinghours);
// console.log(timetable[dayMapping[0]],"org") 
  const avilabletime: string[] = useMemo(() =>
    divideTimeSlots(
      workinghours?.split("-")[0],
      workinghours?.split("-")[1],
      Number(length),
      //@ts-expect-error
      reservations,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ),[reservations]
  );
  const [activeOption, setActiveOption] = useState("");
  if (avilabletime.length == 0 || isLoading) return <h1 className="animate-pulse">....</h1>;
  console.log(activeOption);
  return (
    <div className="time flex max-h-[364px] flex-col gap-2 overflow-y-auto border-l border-bordersubtle text-white delay-75 ease-in sm:flex sm:flex-col">
      {avilabletime.map((time, index) => {
        if (index != avilabletime.length - 1)
          return (
            <div
              onClick={() => {
                setStartTime(time);
                setEndTime(avilabletime[index + 1] || "");
                setActiveOption(time);
              }}  
              className={classNames(
                " scrollbar cursor-pointer justify-center rounded   border-black px-12 py-1 text-black hover:border hover:bg-slate-100 md:flex",
                {
                  border: activeOption == time,
                }
              )}
              key={time}
            >
              {time}
            </div>
          );
      })}
    </div>
  );
}
export default SetMeetingTime;
