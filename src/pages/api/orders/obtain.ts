import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const orders = await prisma.orden.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                estado: true,
                // bring image inside category inside prenda
                prenda: {
                    include: {
                        tipo: true,
                        complejidad: true,
                    }
                },
                archivos: true,
                cotizacionOrden: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                detallesPrenda: {
                    include: { atributos: true }
                },
                servicios: true,
                procesos: {
                    include: { estado: true, proceso: true }
                },
                mensajes: { include: { user: true } }
            },
            where: { user: { email: req.body.email } }
        })

        const finalOrders = orders.map(order => ({
            ...order,
            procesos: order.procesos.map(proc => ({ estado: proc.estado.descripcion, proceso: proc.proceso.nombre, icon: proc.proceso.icono, id: proc.id })),
            mensajes: order.mensajes.map(msg => ({ message: msg.mensaje, user: { email: msg.user.email, name: msg.user.name }, timestamp: msg.createdAt, id: msg.id }))
        }));

        res.status(200).json(finalOrders);
        
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
