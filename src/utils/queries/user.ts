import { UserCreationSchemaType } from "@backend/schemas/UserCreationSchema"

export type ErrorMessage = { error: string }


export type SignupResponse = {
    statusCode: number,
    body: {
        user: {
            name: string,
            email: string,
            image: string,
        }
    }
}

export type PasswordResetData = { password: string; confirmPassword: string; token: string }
export type PasswordResetResponse = { statusCode: number, message: string }

export type UserHandlerError = {
    error?: string | {
        fieldErrors: { [key: string]: string[] }
        formErrors: string[]
    }
}


const errorHandle = (res: Response) => res.json().then(json => Promise.reject(json))


export const postSignup = (data: UserCreationSchemaType) => fetch(`/api/user/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.ok ? res.json() : errorHandle(res))


export const updatePasssword = (data: PasswordResetData) => fetch(`/api/user/updatePassword`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.ok ? res.json() : errorHandle(res))

export const sendEmail = async (data: { email: string }) => fetch('/api/user/reset-email', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    .then(res => res.ok ? res.json() : errorHandle(res))
