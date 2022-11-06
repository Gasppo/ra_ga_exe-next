// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const obtainClothes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clothes = await prisma.tipoPrenda.findMany()
    res.status(200).json(clothes);
  }
  catch (error) {
    res.status(500).json({ error: error })
    throw error;
  }
};

export default obtainClothes;
