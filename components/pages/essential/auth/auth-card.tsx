"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

export function AuthCard() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isLogin = pathname === "/login"
    const paramsString = searchParams.toString()
    const queryString = paramsString ? `?${paramsString}` : ""

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {isLogin ? "Welcome Back" : "Create an Account"}
                </CardTitle>
                <CardDescription className="text-center">
                    {isLogin
                        ? "Enter your email below to login to your account"
                        : "Enter your information below to create your account"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLogin ? <LoginForm /> : <SignupForm />}
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Link
                        href={(isLogin ? "/signup" : "/login") + queryString}
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
