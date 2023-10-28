import React, { useState } from "react";
import type { singleEvent } from "../interfaces/singleEvent";
import Image from "next/image";
import { trpc } from "@/lib/trpc/client";
import clock from ".././../public/clock.png";
import toast from "react-hot-toast";
import Link from "next/link";
import link from ".././../public/icons8-link-24.png";
import open from "../../public/icons8-open-30.png";
import { Switch } from "@headlessui/react";
import { Card } from "./ui/card";
function SingleEvent({ data }: { data: singleEvent }) {
  const [enabled, setEnabled] = useState(!data.hidden);
  console.log(data.hidden);
  const { mutate: hide } = trpc.eventType.hideEvent.useMutation();
  const { mutate: unhide } = trpc.eventType.unhideEvent.useMutation();
  return (
    <div className="md:[w-500px]  w-[320px] rounded-sm border border-slate-400 border-opacity-40 sm:w-[350px] lg:w-[700px]">
      <div className="    bg-black px-3 py-2 text-white hover:bg-slate-950">
        <div className="flex justify-between">
          <div className="left">
            <div className="top">
              <h1 className="text-lg">{data.title}</h1>
              <div className="mt-2 flex gap-2">
                <Image
                  className="rounded-full"
                  src={clock}
                  width={25}
                  height={25}
                  alt="clock"
                />
                <h1>{data.length} Min</h1>
              </div>
            </div>
          </div>

          <div className="right flex cursor-pointer items-center justify-center gap-6">
            {!enabled && (
              <h1 className="rounded bg-hovercolor px-0.5 py-0.5 ">Hidden</h1>
            )}
            <Switch
              checked={enabled}
              onClick={() => {
                enabled ? hide({ id: data.id }) : unhide({ id: data.id });
              }}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-blue-600" : "bg-gray-800"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <Link target="" href={`/bookings/${data.id}`}>
              <Image src={open} width={25} height={25} alt="open" />
            </Link>
            <Image
              onClick={() => {
                navigator.clipboard
                  .writeText(`http://localhost:3000/bookings/${data.id}`)
                  .then(() => toast.success("copied"))
                  .catch((err) => console.log(err));
              }}
              className="rounded-full"
              src={link}
              width={25}
              height={25}
              alt="link"
            />
          </div>
        </div>

        {/* <p className="text-sm text-slate-300">{data.length}</p> */}
      </div>
    </div>
  );
}

export default SingleEvent;
