"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addPassServer } from "@/actions/action"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  website: z.string().min(3, {
    message: "Website must be at least 3 characters."
  }).max(50, {
    message: "Website cannot exceed 50 characters."
 }),
   username: z.string().min(4, {
    message: "Username must be at least 4 characters."
  }).max(20, {
    message: "Username cannot exceed 20 characters."
  }).regex(/^[a-zA-Z0-9_]*$/, {
    message: "Username can only contain letters, numbers, and underscores."
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }).max(64, {
    message: "Password cannot exceed 64 characters."
  }),
  });

export default function AddPass() {
  
  const user = useUser()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      website:"",
      username: "",
      password: ""
    }
   
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if(user.user){
      addPassServer(values.website, values.username, values.password,  user?.user?.id)
      toast.success('Password added')
      form.reset()
      router.refresh()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle> Add your new Password</CardTitle>
      </CardHeader>

    <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Your Website URL" {...field} />
              </FormControl>
              <FormDescription>
                This is your Website URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder=" Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your username
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

    <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder=" Your password" {...field} />
              </FormControl>
              <FormDescription>
                This is your website's password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </CardContent>
     
    </Card>
  )
}

