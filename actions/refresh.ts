"use server"

import { BaseResponse } from "@/types/base";
import axios from "axios";
import { JWT } from "next-auth/jwt";

interface RefreshTokenResponse {
    user?: any;
    tokens: {
        access_token: string;
        refresh_token: string;
        expires_in: string;
    };
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`, null, {
            headers:{
                refresh_token: token.refreshToken
            }
        });

        const {data, success}: BaseResponse<RefreshTokenResponse> = response.data;

        if (!success || !data) {
            throw data;
        }

        return {
            ...token,
            accessToken: data.tokens.access_token,
            refreshToken: data.tokens.refresh_token,
            expiresAt: new Date(data.tokens.expires_in).getTime(),
            error: undefined // Clear any error
        };
    } catch (error) {
        console.error("RefreshTokenError", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
