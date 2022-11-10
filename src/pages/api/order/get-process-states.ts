import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';

const getProcessStates = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const processStates = await prisma.estadoProcesoDesarrollo.findMany({})

        res.status(200).json(processStates);

    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default getProcessStates;