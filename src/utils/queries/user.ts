
export type ErrorMessage = { error: string }

export type SignupData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

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

export type PasswordResetData = { password: string; confirmPassword: string; id: string }
export type PasswordResetResponse = { statusCode: number, message: string }

export type UserHandlerError = {
    error?: string | {
        fieldErrors: { [key: string]: string[] }
        formErrors: string[]
    }
}


const errorHandle = (res: Response) => res.json().then(json => Promise.reject(json))


export const postSignup = (data: SignupData) => fetch(`/api/user/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.ok ? res.json() : errorHandle(res))


export const updatePasssword = (data: PasswordResetData) => fetch(`/api/user/updatePassword`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.ok ? res.json() : errorHandle(res))

