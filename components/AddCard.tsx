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
import { addCardServer } from "@/actions/action"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 digits.",
  }).max(19, {
    message: "Card number cannot exceed 19 digits."
}).regex(/^\d+$/, {
    message: "Card number must contain only digits."
}),
expiryDate:z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
  message: "Expiry date must be in MM/YY format."
}),
cvv: z.coerce.number().min(100, {
  message: "CVV must be at least 3 digits."
}).max(9999, {
  message: "CVV cannot exceed 4 digits."
}),
  });

export default function AddCard() {
  
  const user = useUser()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      cardNumber:"",
      cvv: 0 ,
      expiryDate: ""
    }
   
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if(user.user){
      addCardServer(values.cardNumber, values.expiryDate,values.cvv, user?.user?.id)
      toast.success('Card added')
      form.reset()
      router.refresh()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Credit Card</CardTitle>
      </CardHeader>

    <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input placeholder="Your Card Number" {...field} />
              </FormControl>
              <FormDescription>
                This is your Card Number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input placeholder=" Your CVV" {...field} />
              </FormControl>
              <FormDescription>
                This is your cvv
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

    <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input placeholder=" Your card's expiry date" {...field} />
              </FormControl>
              <FormDescription>
                This is your card's expiry date
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

