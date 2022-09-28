import { PrismaClient } from '@prisma/client';
import { checkIfUserExists } from '@utils/dbcalls/user';
import { generateEmailer } from "@utils/generateEmailer";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
const prisma = new PrismaClient()


const CreationDataSchema = z.object({
    bolsillos: z.object({
        selected: z.boolean(),
        cantidad: z.number(),
        observaciones: z.string()
    }),
    botones: z.object({
        selected: z.boolean(),
        cantidad: z.number(),
        observaciones: z.string()
    }),
    cierre: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    cliente: z.string(),
    elastico: z.object({
        selected: z.boolean(),
        metros: z.number(),
        observaciones: z.string()
    }),
    geometral: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    logoMarca: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    manga: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    molderiaBase: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    talles: z.object({
        selected: z.boolean(),
        talle: z.array(z.object({
            nombre: z.string(),
            medidas: z.string()
        }))
    }),
    tipoPrenda: z.object({
        id: z.string().uuid().optional(),
        name: z.string(),
        picture: z.string().optional()
    }),
    user: z.object({
        name: z.string(),
        email: z.string().email(),
        image: z.string()
    }),
    files: z.array(z.instanceof(File)).optional()
})

export type FichaTecnicaForm = z.infer<typeof CreationDataSchema>


const examples = async (req: NextApiRequest, res: NextApiResponse) => {



    try {
        const data = CreationDataSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

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

export default examples;