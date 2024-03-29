import { prisma } from '@server/db/client';
import type { NextApiRequest, NextApiResponse } from "next";


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    //const { id } = req.query;

    try {
        const orders = await prisma.orden.findUnique({
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
                    include: { estado: true ,proceso: true, FichaTecnica: { include: { archivos: true, contenido: true } }, usuarioDeServicio: true }
                },
                mensajes: { include: { user: true } }
            },
            where: { id: req.body.orderId }
        })

        const formattedProcesses = orders.procesos.map(proc => ({
            estado: proc.estado.descripcion,
            proceso: proc.proceso.nombre,
            icon: proc.proceso.icono,
            id: proc.id,
            lastUpdated: proc.lastUpdated,
            ficha: proc.FichaTecnica,
            recursos: proc.usuarioDeServicio.map(el => ({ key: el.email, text: el.name }))
        }))
        
        const formattedMessages = orders.mensajes.map(msg => ({
            message: msg.mensaje,
            user: {
                email: msg.user.email,
                name: msg.user.name
            },
            timestamp: msg.createdAt,
            id: msg.id
        }))

        res.status(200).json({
            ...orders,
            procesos: formattedProcesses,
            mensajes: formattedMessages
        });
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
