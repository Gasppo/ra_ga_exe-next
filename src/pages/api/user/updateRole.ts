import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);
    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {
        /* update role of user to admin if cliente and to cliente if admin */ 
        
        const userRole = await prisma.user.findUnique({
            where: { id: req.body.id },
            select: { role: true } 
        })

        if (userRole.role.name === 'Administrador') {
            await prisma.user.update({
                where: { id: req.body.id },
                data: { role: { connect: { name: 'Usuario' } } }
            })
        } else {
            await prisma.user.update({
                where: { id: req.body.id },
                data: { role: { connect: {  name: 'Administrador' } } }
            })
        }

        res.status(200).json({ message: 'Rol actualizado' });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}
