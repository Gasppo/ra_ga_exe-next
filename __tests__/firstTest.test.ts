import { UserCreationSchemaType } from '@backend/schemas/UserCreationSchema'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


afterAll(async () => {
    //Delete every user
    await prisma.user.deleteMany({})
    console.log('✨ User deleted')
})


it('Should create a User', async () => {

    const data: UserCreationSchemaType = {
        name: 'Test',
        email: 'gasppogb@gmail.com',
        password: '123456asd',
        confirmPassword: '123456asd'
    }

    const newUser = await fetch(`/api/user/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

    expect(newUser.status).toBe(200)

})