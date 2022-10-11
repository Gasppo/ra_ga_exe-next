import { UserCreationSchemaType } from '@backend/schemas/UserCreationSchema'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
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


    const newUser = await axios.post('/api/user/create', data)


    expect(newUser.status).toBe(200)

})