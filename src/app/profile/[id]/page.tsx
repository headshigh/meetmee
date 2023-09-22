"use client"
import Image from "next/image";
import { trpc } from "@/lib/trpc/client";
import React from "react";
import { useRouter } from "next/router";
import pp from "../../../public/DALL·E 2023-05-31 22.10.16 - social media base profile pic for male .png";
import ProfileSingleEvent from "../../../components/ProfileSingleEvent";
function Profile() {
  const router = useRouter();
  const { data: userInfo, isLoading: infoLoading } = 
    trpc.user.getUserInfo.useQuery({
      id: router.query.id as string,
    });
  const { data: userEventtypes, isLoading: eventsLoading } =
    trpc.eventType.getPubllicPageEventtypes.useQuery({
      userId: router.query.id as string,
    });
  if (infoLoading || !userInfo) return <h1 className="text-white">Loading</h1>;

  return (
    <div className="bg-background ">
      <div className="userinfo mt-3 flex flex-col items-center text-3xl">
        <Image
          className="rounded-full"
          src={pp}
          width={100}
          height={100}
          alt="pp"
        />
        <h1 className="text-white">{userInfo?.name}</h1>
      </div>

      <div className="events mt-5 flex justify-center">
        {eventsLoading || !userEventtypes ? (
          <h1>Loading</h1>
        ) : (
          <div>
            {
              //@ts-expect-error idont know
              userEventtypes.map((event: singleEvent) => (
                <ProfileSingleEvent key={event.id} data={event} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
