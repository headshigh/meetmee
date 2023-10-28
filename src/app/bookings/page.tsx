"use client"
import React from "react";
import SingleBooking from "../../components/SingleBooking";
import toast from "react-hot-toast";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Index() {
    const {data:sessionData}=useSession();
  const { data, isLoading } = trpc.booking.getUserBooking.useQuery({
    userId: "clmq8xng60000uvd08fuz8uq1",
  });
  console.log(data);
  const { mutate, isLoading: isBookingLoading } =
    trpc.booking.cancelBooking.useMutation({
      onSuccess: async () => {
        // await queryClient.invalidateQueries("getUserBooking");
        toast.success("Booking sucessfully cancelled. Refresh to see changes");
      },
      onError: () => {
        toast.error("Unable to cancel the booking");
      },
    });
  if (isLoading) return <h1 className="text-center animate-pulse">Loading...</h1>;
  if (!data) return <></>;
  return (
    <div className=" flex min-h-screen flex-col items-center gap-1 bg-background">
      {data.map((booking:any) => (
        <SingleBooking
          key={booking?.id}
          data={booking}
          onDelete={mutate({
            userId: "clmq8xng60000uvd08fuz8uq1",
            bookingId: booking.id,
          })}
          cancelLoading={isBookingLoading}
        />
      ))}
    </div>
  );
}
export default Index;
