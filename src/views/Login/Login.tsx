"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
 
const formSchema = z.object({
    username: z.string().min(1, "Username is required").regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers"),
    password: z.string().min(6, "Password must be at least 6 characters").regex(/^[a-zA-Z0-9]+$/, "Password must contain only letters and numbers"),
  });

function Login() {
        const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        alert(values.username + " " + values.password)
      } 

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-1/3 border-2 rounded-md p-4">
                <div className="mb-6 relative flex items-center justify-center">
                    <div className="absolute top-0 left-0">
                        <Link href="/" className="text-sm underline">Quay trở lại</Link>
                    </div>
                    <div className="text-2xl font-bold">
                        ADMIN LOGIN
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admin</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
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
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
      )
    
      
}

export default Login;