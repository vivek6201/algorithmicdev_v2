import { LoginFormValues, SignupInput } from "@/validations/auth";
import { apiClient } from "../api";
import { BaseResponse, UserProfile, User } from "@/types/base";
import { AxiosError } from "axios";

export const loginUser = async (values: LoginFormValues) => {
    const payload = {
        email: values.type === "email" ? values.identifier : undefined,
        username: values.type === "username" ? values.identifier : undefined,
        password: values.password
    }

    try {
        const { data } = await apiClient<BaseResponse<User>>({
            endpoint: "/api/auth/login",
            method: "POST",
            body: payload,
        })

        return data
    } catch (e) {
        const error = e as AxiosError
        return error.response?.data as BaseResponse<null>
    }
}

export const signupUser = async (values: SignupInput) => {
    const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        confirm_password: values.confirmPassword
    }

    try {
        const { data } = await apiClient<BaseResponse<User>>({
            endpoint: "/api/auth/signup",
            method: "POST",
            body: payload,
        })

        return data
    } catch (e) {
        const error = e as AxiosError
        return error.response?.data as BaseResponse<null>
    }
}

export const logoutUser = async () => {
    try {
        const { data } = await apiClient<BaseResponse<null>>({
            endpoint: "/api/auth/logout",
            method: "DELETE",
        })

        return data
    } catch (e) {
        const error = e as AxiosError
        return error.response?.data as BaseResponse<null>
    }
}

export const fetchCurrentUser = async () => {
    try {
        const { data } = await apiClient<BaseResponse<UserProfile>>({
            endpoint: "/api/users/me",
            method: "GET",
        })

        return data
    } catch (e) {
        const error = e as AxiosError
        return error.response?.data as BaseResponse<null>
    }
}