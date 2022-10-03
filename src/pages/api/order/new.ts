import { OrderCreationDataSchema } from '@backend/schemas/OrderCreationSchema';
import { generateEmailer } from '@utils/email/generateEmailer';
import { checkIfUserExists } from 'backend/dbcalls/user';
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';

const post = async (req: NextApiRequest, res: NextApiResponse) => {



    try {
        const data = OrderCreationDataSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        const clothesCategory = await prisma.clothesCategory.findFirst({
            where: {
                OR: [
                    { id: data.tipoPrenda.id },
                    { name: data.tipoPrenda.name }
                ]
            }
        })


        const complexity = await prisma.complexity.findFirst({
            where: {
                name: 'Basico'
            }
        })


        console.log(`${clothesCategory.name} ${complexity.name}`)

        const categoria = await prisma.categoria.findFirst({
            where: {
                nombre: 'Pantalon Basico'
            }
        })

        const estado = await prisma.estadoOrden.findFirst({
            where: {
                id: 1
            }
        })

        const user = await checkIfUserExists({ email: data.user.email })


        const orden = await prisma.orden.create({
            data: {
                idCategoria: categoria.id,
                nombre: categoria.nombre,
                cantidad: 100,
                idEstado: estado.id,
                userId: user.id
            }
        })

        await sendEmail({
            html: `
        <h1>Orden creada ${user.name}</h1>
        <p>Se ha creado una orden con el nombre ${categoria.nombre} y la cantidad de ${orden.cantidad}</p>
        <p>Para ver mas detalles de la orden ingresa a <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/">este enlace</a></p>
        `, to: user.email, subject: 'Orden creada'
        })

        res.status(200).json({ message: 'Orden creada con éxito' });

    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }


}

export default post;