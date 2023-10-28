import React from "react";
import Image from "next/image";
import type { singleEvent } from "../../interfaces/singleEvent";
import pp from "../../../public/pp.png";
import type { user } from "../../interfaces/UserInterface";
import calendar from "../../../public/icons8-calendar-48.png";
import { AmOrPm } from "../../modules/times";
import { month } from "../../modules/times";
import toast from "react-hot-toast";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { useParams, useRouter } from "next/navigation";
import Spinner from "../Spinner";
import ConfirmationPage from "./ConfirmationPage";
import Link from "next/link";
import { Card } from "@mui/material";
import { Button } from "../ui/button";
export interface singleEventWithDetails extends singleEvent {
  user: user;
  startTime: string;
  endTime: string;
  dateObject?: Date;
  meetingDate: string ;
}
function FurtherBookingDetails(data: singleEventWithDetails) {
  const router = useRouter();
  const {id}=useParams();
  const [name, setName] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const { mutate, isLoading: isBooking } =
    trpc.booking.createBooking.useMutation({
      onSuccess: async () => {
        router.push(
          `/bookings/${Number(id)}?hostName=${name}&&email=${email}`
          );
          setBookingConfirmed(true);
        toast.success("Sucessfully created a booking!");
        console.log("success");
      },
    });
  const dateObject = new Date(data.meetingDate);
  return (
    <div>
      <Link
        href={"/bookings"}
        className="back absolute left-28 text-white"
      ></Link>
      {!bookingConfirmed ? (
        <Card className="model text-brown-200  border-border  rounded border  bg-white text-black px-4 py-7">
          <div className="info  flex  flex-col   sm:flex-row ">
            <div className="userinfo border-bordersubtle px-1 sm:border-r sm:pr-8 md:max-w-[400px]">
              <div className="br-1 flex items-center gap-0">
                <Image src={pp} width={30} height={30} alt="pp"></Image>
                <p className="text-lg font-medium tracking-wide text-background">
                  {data.user.name}
                </p>
              </div>
              <h1 className="mt-2 font-sans text-2xl font-bold tracking-tighter">
                {data.title}
              </h1>
              <div className="mt-2 flex items-start gap-2">
                <Image
                  src={calendar}
                  width={18}
                  height={18}
                  alt="clock"
                ></Image>
                {data.startTime &&
                  data.endTime &&
                  data.meetingDate &&
                  dateObject && (
                    <div className="text-lg font-[400]">
                      <h1>{`${
                        data.meetingDate.toString().split(" ")[0] || "Mon"
                      } ${dateObject.getDate()} ${month(
                        Number(dateObject?.getMonth())
                      )}`}</h1>
                      <h1 className="text-lg font-[400]">
                        {` ${AmOrPm(
                          Number(data.startTime.split(":")[0]),
                          Number(data.startTime.split(":")[1])
                        )} To
                        ${AmOrPm(
                          Number(data.endTime.split(":")[0]),
                          Number(data.endTime.split(":")[1])
                        )}`}
                      </h1>
                    </div>
                  )}
              </div>
            </div>
            <div className="max-w-[400px] sm:px-4">
              <h1 className="pb-1"> Your Name</h1>
              <input
                onChange={(e) => setName(e.target.value)}
                className=" h-9 w-full border  border-slate-600 px-2"
                type="text"
                placeholder="Nischal Gautam"
              />
              <h1 className="pb-1">Email Address</h1>
              <input
                type="text"
                placeholder="email@example.com"
                className="h-9 w-full border border-slate-600 px-2 "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button 
              className=""
                disabled={isBooking}
                onClick={() => {
                  if (name.length == 0 || email.length == 0) {
                    toast.error("You must fill name and email");
                  }
                  if (!email.match(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    return toast.error("not a valid email format");
                  } else {
                    mutate({
                      userId: "clmq8xng60000uvd08fuz8uq1",
                      eventTypeId:Number(id),
                      participants: ["clmq8xng60000uvd08fuz8uq1"],
                      date: data.meetingDate,
                      hostEmail: email,
                      hostName: name,
                      startTime: data.startTime,
                      endTime: data.endTime,
                    });
                  }
                }}
                
              >
                {isBooking ? <Spinner className="h-5 w-5" /> : "Book Meeting"}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <ConfirmationPage {...data} dateObject={dateObject} />
      )}
    </div>
  );
}
export default FurtherBookingDetails;
