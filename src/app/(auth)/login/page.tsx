"use client"
import { Button, buttonVariants } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
export default function Home() {
  const data=useSession();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{data.data?.user.id}</h1>
      {!data.data && <button onClick={()=> void signIn("google")}>Sign in</button>}
      {data.data && <Button onClick={()=>void signOut()}>Sign out</Button>}
    </main>
  )
}
