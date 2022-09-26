import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { checkIfUserExists } from "../../../utils/dbcalls/user";

const prisma = new PrismaClient()


const examples = async (req: NextApiRequest, res: NextApiResponse) => {

    //console.log(JSON.parse(req.body))
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

    const user = await checkIfUserExists({ email: req.body.user.email })

    try {
        
        await prisma.orden.create({
            data: {
                idCategoria: categoria.id,
                nombre: categoria.nombre,
                cantidad: 100,
                idEstado: estado.id,
                userId: user.id
        }})

        res.status(200).json({ message: 'Orden creada con éxito' });      
        
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }     
        
    
}

export default examples;