"use client"
// import Calendar from "react-import * as React from "react";
import { trpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import pp from "../../../../public/pp.png"
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import clock from "../../../../public/clock.png";
import SetMeetingTime from "@/components/forBooking/setMeetingTime";
import FurtherBookingDetails from "@/components/forBooking/FurtherBookingDetails";
import { Card } from "@/components/ui/card";
function BookingLink() {
  const router = useRouter();
  const [datevalue, setDateValue] = useState<string>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  console.log(datevalue);
  console.log(startTime, endTime);
  const {id} = useParams();
  console.log(id);
  const { data, isLoading } = trpc.eventType.getSingle.useQuery({
    id: Number(id),
  });
  console.log(data);
  const { mutate, isLoading: isBooking } =
    trpc.booking.createBooking.useMutation({
      onSuccess: () => {
        toast.success("Sucessfully created a booking!");
        console.log("success");
      },
      onError: (e:any) => {
        toast.error("unable to create booking");
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        console.log(errorMessage);
      },
    });
  console.log("val", datevalue);
  if (!data) return <></>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="flex h-[364px] min-h-screen items-center justify-center ">
      {!startTime && !endTime ? (
        <Card className="model text-brown-200  border-border w-[750px] rounded border  bg-white text-black px-4 py-7">
          <div className="info  flex  flex-col   sm:flex-row ">
            <div className="userinfo min-w[230px] border-bordersubtle px-1 sm:border-r sm:pr-8">
              <div className="br-1 flex items-center gap-0">
                <Image src={pp} width={30} height={30} alt="pp"></Image>
                <p className="text-lg font-medium tracking-wide text-background">
                  {data.user.name}
                </p>
              </div>
              <h1 className="mt-2 font-sans text-2xl font-bold tracking-tighter">
                {data.title}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <Image src={clock} width={18} height={18} alt="clock"></Image>
                <h1 className="text-lg font-medium">{data.length} Min</h1>
              </div>
            </div>
            <div className="max-w-[400px] sm:px-4">
              {/* <Calendar
              className={"w-full font-medium"}
              onChange={(value) => setDateValue(new Date(value))}
            /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar onChange={(value:any) => setDateValue(value)} />
              </LocalizationProvider>
            </div>
            <div>
              {datevalue && (
                <SetMeetingTime
                  length={data.length}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  date={datevalue}
                />
              )}
            </div>
          </div>
        </Card>
      ) : (
        <FurtherBookingDetails
          {...data}
          startTime={startTime}
          endTime={endTime}
          meetingDate={datevalue}
        />
      )}
    </div>
  );
}

export default BookingLink;
