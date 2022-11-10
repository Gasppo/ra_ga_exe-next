import { NextApiRequest, NextApiResponse } from "next";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const updateUser = await prisma.user.update({
            where: {
                email: req.body.email,
            },
            data: {
                name: req.body.name,
                razonSocial: req.body.razonSocial,
                email: req.body.email,
                telefono: req.body.telefono,
                cuit: req.body.cuit,
                direccionFacturacion: req.body.direccionFacturacion,
                direccionEnvio: req.body.direccionEnvio,
            }
        });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default post;