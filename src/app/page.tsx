"use client"
import { Icons } from "../components/icons"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { signIn } from "next-auth/react"
export function DemoCreateAccount() {
  return (
    <div className="flex items-center justify-center h-screen">
    <Card className="w-1/2 ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="default" onClick={()=>void signIn("google")}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="default"  onClick={()=>void signIn("google")}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
export default DemoCreateAccount;