import { ReducedUserInfoSchemaType } from "@backend/schemas/ReducedUserInfoSchema"
import { UserCreationSchemaType } from "@backend/schemas/UserCreationSchema"
import { UserInfoSchemaType } from "@backend/schemas/UserInfoSchema"
import { Role } from "@prisma/client"

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

export const getRole = (email: string): Promise<Role> => fetch(`/api/user/obtainRole`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const getAvailability = (email: string): Promise<{ available: boolean }> => fetch(`/api/user/obtainAvailability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const getRoleNames = (): Promise<Role[]> => fetch(`/api/user/obtainRoles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const updateUserRole = (id: string, role: string) => fetch(`/api/user/updateRole`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, role })
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const updateUserAvailability = (id: string, available: boolean) => fetch(`/api/user/updateAvailability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, available })
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const getReducedUser = (email): Promise<ReducedUserInfoSchemaType> => fetch(`/api/user/obtainReduced`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email)
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const getUserInfo = (id: string): Promise<UserInfoSchemaType> => fetch(`/api/user/obtainUserInfo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

export const updateUser = (data: UserInfoSchemaType) => fetch(`/api/user/updateInfo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch(err => console.log(err))

