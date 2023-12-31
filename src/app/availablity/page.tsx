"use client"
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { trpc } from '@/lib/trpc/client'

import Timetableselect from '@/components/Timetableselect'
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
function Onboard() {
  const {data}=trpc.timetable.getTimeTable.useQuery({userId:"clmq8xng60000uvd08fuz8uq1"});
  if(!data) redirect("/onboard")
  console.log("timetable",data);
  const [timetable,settimetable]=useState({
    sundaystarting:data?.Sunday.split('-')[0],
    mondaystarting:data?.Monday.split('-')[0],
    tuesdaystarting:data?.Tuesday.split('-')[0],
    wenesdaystarting:data?.Wenesday.split('-')[0],
    thursdaystarting:data?.Thursday.split('-')[0],
    fridaystarting:data?.Friday.split('-')[0],
    saturdaystarting:data?.Friday.split('-')[0],
    sundayending:data?.Sunday.split('-')[1],
    mondayending:data?.Monday.split('-')[1],
    tuesdayending:data?.Tuesday.split('-')[1],
    wenesdayending:data?.Wenesday.split('-')[1],
    thursdayending:data?.Thursday.split('-')[1],
    fridayending:data?.Friday.split('-')[1],
    saturdayending:data?.Saturday.split('-')[1],
  })
  const [checked,setChecked]=useState({
    sunday:true,
    monday:true,
    tuesday:true,
    wenesday:true,
    thursday:true,
    friday:true,
    saturday:true,
  });
  console.log(checked);
  const {mutate}=trpc.timetable.createTimeTable.useMutation();
  return (
    <div className='text-white flex dark  justify-center dark w-full '>
      <Card className=' px-28 py-10  w-full h-screen'>
        <h1 className='font-bold text-3xl'>Set Your Availablity</h1>
        <p className='mt-4 text-sm pb-10' >Define ranges of time when you are avilable <br/> You an costumize this later in the avialablity page</p>
        <Card className='px-3 py-4 '>
          <div className='flex flex-col gap-3 w-[160px]'>
        <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-3 w-[160px]'>
          <Switch onCheckedChange={()=>{
            console.log("chane");
            setChecked({
            ...checked,
            ["sunday"]:!checked.sunday
          })}} checked={checked.sunday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Sunday</Label>
        </div>
       <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"sundaystarting"}/>
          {/* <input type="text"  className=' border-gray-200   border  px-1 w-10  rounded-md'  /> */}
          -
          <Timetableselect  defaultvalue={"17:00"} settimetable={settimetable} timetable={timetable} id={"sundayending"}/>
        </div>
        <div> 
        </div>
        <div className='flex gap-8 items-center '>
        <div className='flex items-center gap-3 w-[160px]'>
          <Switch onCheckedChange={()=>setChecked({
            ...checked,
            ["monday"]:!checked.monday
          })}  checked={checked.monday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Monday</Label>
        </div>
        <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"mondaystarting"}/>
          -
          <Timetableselect defaultvalue={"17:00"}  settimetable={settimetable} timetable={timetable} id={"mondayending"}/>
        </div>
        <div>
        </div>
        <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-3 w-[160px]'>
          <Switch onCheckedChange={()=>setChecked({
            ...checked,
            ["tuesday"]:!checked.tuesday
          })} checked={checked.tuesday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Tuesday</Label>
        </div>
        <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"tuesdaystarting"}/>
          -
          <Timetableselect defaultvalue={"17:00"}  settimetable={settimetable} timetable={timetable} id={"tuesdayending"}/>
        </div>
        <div>
        </div>
        <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-3 w-[160px]'>
          <Switch onCheckedChange={()=>setChecked({
            ...checked,
            ["wenesday"]:!checked.wenesday
          })} checked={checked.wenesday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Wenesday</Label>
        </div>
        <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"wenesdaystarting"}/>
          -
          <Timetableselect defaultvalue={"17:00"}  settimetable={settimetable} timetable={timetable} id={"wenesdayending"}/>
        </div>
        <div>
        </div>
        <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-3 w-[160px] '>
          <Switch onCheckedChange={()=>setChecked({
            ...checked,
            ["thursday"]:!checked.thursday
          })} checked={checked.thursday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Thursday</Label>
        </div>
        <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"thursdaystarting"}/>
          -
          <Timetableselect defaultvalue={"17:00"} settimetable={settimetable} timetable={timetable} id={"thursdayending"}/>
        </div>
        <div>
        </div>
        <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-3 w-[160px]'>
          <Switch onCheckedChange={()=>setChecked({
            ...checked,
            ["friday"]:!checked.friday
          })}  checked={checked.friday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Friday</Label>
        </div>
        <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"fridaystarting"}/>
          -
          <Timetableselect defaultvalue={"17:00"} settimetable={settimetable} timetable={timetable} id={"fridayending"}/>
        </div>
        <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-3 w-[160px]'>
          <Switch   onCheckedChange={()=>setChecked({
            ...checked,
            ["saturday"]:!checked.saturday
          })} checked={checked.saturday} id="non-holiday" />
          <Label htmlFor="airplane-mode">Saturday</Label>
        </div>
        <Timetableselect defaultvalue={"09:00"} settimetable={settimetable} timetable={timetable} id={"saturdaystarting"}/>
          -
          <Timetableselect defaultvalue={"17:00"} settimetable={settimetable} timetable={timetable} id={"saturdayending"}/>
        </div>
        <div>
        </div>
          </div>
          <div className='ml-auto' >
            <Button className='  bg-input hover:bg-input' onClick={()=>mutate({
              sunday:checked.sunday==false?"00:00-00:00":`${timetable.sundaystarting}-${timetable.sundayending}`,
              monday:checked.monday==false?"00:00-00:00":`${timetable.mondaystarting}-${timetable.mondayending}`,
              tuesday:checked.tuesday==false?"00:00-00:00":`${timetable.tuesdaystarting}-${timetable.wenesdayending}`,
              wenesday:checked.wenesday==false?"00:00-00:00":`${timetable.wenesdaystarting}-${timetable.wenesdayending}`,
              thursday:checked.thursday==false?"00:00-00:00":`${timetable.thursdaystarting}-${timetable.thursdayending}`,
              friday:checked.friday==false?"00:00-00:00":`${timetable.fridaystarting}-${timetable.fridayending}`,
              saturday:checked.saturday==false?"00:00-00:00":`${timetable.saturdaystarting}-${timetable.saturdayending}`,
              userId:"clmq8xng60000uvd08fuz8uq1",
            })}>Submit</Button>
          </div>
        </Card>
      </Card>
    </div>
  )
}

export default Onboard