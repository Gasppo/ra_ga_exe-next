import { UserCreationSchemaType } from '@backend/schemas/UserCreationSchema'
import handleUserCreation from '@pages/api/user/create'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()


afterAll(async () => {
    //Delete every user
    await prisma.user.deleteMany({})
    console.log('✨ User deleted')
})

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

it('Should create a User with correct values', async () => {

    const data = {
        name: 'Test',
        email: 'gasppogb@gmail.com',
        password: '123456asd',
        confirmPassword: '123456asd'
    }

    const req = {
        method: 'POST',
        body: data
    } as NextApiRequest

    const json = jest.fn<any, ExpectedResponse[]>();
    const status = jest.fn().mockReturnValue({ json });

    const res = {
        status,
    } as unknown as NextApiResponse

    await handleUserCreation(req, res)
    expect(json.mock.calls[0][0].statusCode).toBe(200)
    expect(json.mock.calls[0][0].body.user.email).toBe('gasppogb@gmail.com')
    expect(json.mock.calls[0][0].body.user.name).toBe('Test')
})