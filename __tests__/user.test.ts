import handleCheckCredentials from '@pages/api/user/check-credentials';
import handleUserCreation from '@pages/api/user/create';
import { generateMockRes } from '@utils/tests/generateMockRes';
import { NextApiRequest } from 'next';



type ExpectedResponse = {
    statusCode?: number,
    body?: {
        user: {
            name: string,
            email: string,
            image: string,
        }
    },
    error?: any
}


describe('User Testing', () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
    it('Should not allow get requests', async () => {
        const data = {
            name: 'Test',
            email: 'gasppogb1@gmail.com',
            password: '123456asd',
            confirmPassword: '123456asd'
        }

        const { res, json } = generateMockRes<ExpectedResponse>()

        const req = { method: 'GET', body: data } as NextApiRequest

        await handleUserCreation(req, res)


        expect(json.mock.calls[0][0].statusCode).toBe(400)
        expect(json.mock.calls[0][0].error).toBe(`The HTTP GET method is not supported at this route.`)


    })

    it('Should create a User with correct values', async () => {

        const data = {
            name: 'Test',
            email: 'gasppogb1@gmail.com',
            password: '123456asd',
            confirmPassword: '123456asd'
        }

        const { res, json } = generateMockRes<ExpectedResponse>()

        const req = { method: 'POST', body: data } as NextApiRequest

        await handleUserCreation(req, res)
        expect(json.mock.calls[0][0].statusCode).toBe(200)
        expect(json.mock.calls[0][0].body.user.email).toBe('gasppogb1@gmail.com')
        expect(json.mock.calls[0][0].body.user.name).toBe('Test')
        expect(json.mock.calls[0][0].body.user.name).toBe('Test')
    })

    it('Should not create a User with incorrect email values', async () => {

        const data = {
            name: 'Test',
            email: '',
            password: '123456asd',
            confirmPassword: '123456asd'
        }

        const { res, json } = generateMockRes<ExpectedResponse>()
        const req = { method: 'POST', body: data } as NextApiRequest

        await handleUserCreation(req, res)

        expect(json.mock.calls[0][0].statusCode).toBe(400)
        expect(json.mock.calls[0][0].error?.fieldErrors?.email?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.fieldErrors?.email?.[0]).toBe("Formato de correo electrónico inválido")

    })

    it('Should not create a User with incorrect password values', async () => {


        const data = {
            name: 'Test',
            email: 'gasppo2@gmail.com',
            password: '1234',
            confirmPassword: '12345'
        }

        const { res, json } = generateMockRes<ExpectedResponse>()
        const req = { method: 'POST', body: data } as NextApiRequest

        await handleUserCreation(req, res)

        expect(json.mock.calls[0][0].statusCode).toBe(400)
        expect(json.mock.calls[0][0].error?.fieldErrors?.password?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.fieldErrors?.confirmPassword?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.formErrors?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.formErrors?.[0]).toBe('Las contraseñas deben ser iguales')
        expect(json.mock.calls[0][0].error?.fieldErrors?.password?.[0]).toBe("Se requiere un mínimo de 8 caracteres")
        expect(json.mock.calls[0][0].error?.fieldErrors?.confirmPassword?.[0]).toBe("Se requiere un mínimo de 8 caracteres")


    })


    it('Should not create a User with incorrect name values', async () => {

        const data = {
            name: '',
            email: 'gasppo2@gmail.com',
            password: '12345asd',
            confirmPassword: '12345asd'
        }

        const { res, json } = generateMockRes<ExpectedResponse>()
        const req = { method: 'POST', body: data } as NextApiRequest

        await handleUserCreation(req, res)

        expect(json.mock.calls[0][0].statusCode).toBe(400)
        expect(json.mock.calls[0][0].error?.fieldErrors?.name?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.fieldErrors?.name?.[0]).toBe("Se requiere un mínimo de 1 caracter")
    })


    it('Should check credentials for existing user', async () => {
        const data = {
            username: 'gasppogb1@gmail.com',
            password: '123456asd'
        }

        const { res, json, status } = generateMockRes<{
            id?: string,
            name?: string,
            email?: string,
            image?: string,
            error?: any
        }>()

        const req = { method: 'POST', body: data } as NextApiRequest

        await handleCheckCredentials(req, res)
        expect(status.mock.calls[0][0]).toBe(200)
        expect(json.mock.calls[0][0].email).toBe(data.username)
    })


    it('Should check incorrect credentials for existing user', async () => {
        const data = {
            username: 'gasppogb1@gmail.com',
            password: '12345asd'
        }

        const { res, json, status } = generateMockRes<{
            id?: string,
            name?: string,
            email?: string,
            image?: string,
            error?: any
        }>()

        const req = { method: 'POST', body: data } as NextApiRequest

        await handleCheckCredentials(req, res)
        expect(status.mock.calls[0][0]).toBe(400)
        expect(json.mock.calls[0][0].email).toBe(undefined)
        expect(json.mock.calls[0][0].error).toBe("Credenciales incorrectas")
    })

    it('Should check non existing user', async () => {
        const data = {
            username: 'gasppogasd@gmail.com',
            password: '12345asd'
        }

        const { res, json, status } = generateMockRes<{
            id?: string,
            name?: string,
            email?: string,
            image?: string,
            error?: any
        }>()

        const req = { method: 'POST', body: data } as NextApiRequest

        await handleCheckCredentials(req, res)
        expect(status.mock.calls[0][0]).toBe(400)
        expect(json.mock.calls[0][0].email).toBe(undefined)
        expect(json.mock.calls[0][0].error).toBe("Credenciales incorrectas")
    })

    it('Should validate correct inputs for credential check', async () => {
        const data = {
            username: '',
            password: ''
        }


        const { res, json, status } = generateMockRes<{
            id?: string,
            name?: string,
            email?: string,
            image?: string,
            error?: any
        }>()

        const req = { method: 'POST', body: data } as NextApiRequest

        await handleCheckCredentials(req, res)

        expect(status.mock.calls[0][0]).toBe(400)
        expect(json.mock.calls[0][0].error?.fieldErrors?.username?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.fieldErrors?.username?.[0]).toBe("Formato de correo electrónico inválido")
        expect(json.mock.calls[0][0].error?.fieldErrors?.password?.length).toBe(1)
        expect(json.mock.calls[0][0].error?.fieldErrors?.password?.[0]).toBe("Se requiere un mínimo de 8 caracteres")

    })
})