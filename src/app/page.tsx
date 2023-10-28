"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React from 'react'
import { trpc } from "@/lib/trpc/client";
function Page() {
  const {data}=useSession();
  console.log(data);
  // if(!data) redirect('/login')
  const {data:timetable,isLoading}=trpc.timetable.getTimeTable.useQuery({
    userId:"clmq8xng60000uvd08fuz8uq1",
  })
  if(!timetable) redirect("/onboard");
  redirect('/eventtypes')
  return (
    <div>Page</div>
  )
}

export default Page