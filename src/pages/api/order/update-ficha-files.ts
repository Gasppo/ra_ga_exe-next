import { FichaTecnicaFileUploadSchema } from "@backend/schemas/FichaTecnicaFileUploadSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';

const handleNewFichaFiles = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { fichaID } = req.query as { fichaID: string }

        const { fichaFiles } = FichaTecnicaFileUploadSchema.parse(req.body);
        const archivos = fichaFiles.files.map(file => ({ name: file.name, urlID: file.urlID, type: file.type }))

        const ficha = await prisma.fichaTecnica.update({
            where: { id: fichaID },
            data: {
                archivos: {
                    create: archivos
                },
                updatedAt: new Date()
            },
        })

        res.status(200).json({ message: 'Ficha actualizada con éxito', ficha });
    }
    catch (e) {
        res.status(400).json({ error: e })
        throw e
    }
}

export default handleNewFichaFiles;
