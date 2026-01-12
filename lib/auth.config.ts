import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/validations/auth";
import { JWT } from "next-auth/jwt"
import { refreshAccessToken } from "@/actions/refresh";
import { loginUser } from "./routes/auth";
import { Role } from "@/types/user";

declare module "next-auth" {
  interface Session {
    accessToken: string
    user: {
      id: string
      email: string
      role: Role
      error?: "RefreshAccessTokenError"
    }
  }

  interface User {
    id: string
    email: string
    role: Role
    accessToken?: string
    emailVerified: Date | null
    refreshToken?: string
    expiresAt?: number
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    user: {
      id: string
      email: string
      role: Role
      emailVerified: Date | null
    }
    refreshToken: string
    expiresAt: number
    error?: "RefreshAccessTokenError"
  }
}

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials:{
                identifier:{
                    label:"Username or Email",
                    type:"text",
                    placeholder:"username or email"
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"password"
                }
            },
            async authorize(credentials){
                const rawCredentials = {
                    identifier: credentials?.identifier,
                    password: credentials?.password
                }
                const validationResult = await loginSchema.safeParseAsync(rawCredentials)

                if (!validationResult.success) {
                    return null
                }
                
                const {identifier, password, type} = validationResult.data

                const {data, success} = await loginUser({identifier, password, type})

                if(!success || !data){
                    return null
                }

                return {
                    ...data.user,
                    role: data.user.role as Role,
                    accessToken: data.tokens.access_token,
                    emailVerified: null,
                    refreshToken: data.tokens.refresh_token,
                    expiresAt: new Date(data.tokens.expires_in).getTime()
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.accessToken = user.accessToken!
                token.refreshToken = user.refreshToken!
                token.expiresAt = user.expiresAt!
                token.user = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    emailVerified: user.emailVerified
                }
                return token
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.expiresAt) {
                return token
            }

            // Access token has expired, try to update it
            return await refreshAccessToken(token)
        },
        async session({session, token}){
            if(token){
                session.accessToken = token.accessToken
                session.user = {
                    ...token.user,
                    error: token.error
                }
            }
            return session
        }
    }
}