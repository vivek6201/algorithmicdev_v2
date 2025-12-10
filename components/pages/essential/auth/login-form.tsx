"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { LoginFormValues, loginSchema } from "@/validations/auth"
import { loginUser } from "@/lib/routes/auth"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { useAuth } from "@/hooks/auth"


export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams();
    const pagePath = decodeURIComponent(searchParams.get("redirect") || "/")
    const router = useRouter()
    const { fetchUser } = useAuth()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema) as any,
        defaultValues: {
            identifier: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormValues) {
        const values = data
        setIsLoading(true)
        const res = await loginUser(values)
        if (res.success) {
            toast.success(res.message)
            fetchUser()
            router.push(pagePath)
        } else {
            toast.error(res.message)
        }
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email or Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username or email" {...field} />
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
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>
        </Form>
    )
}
