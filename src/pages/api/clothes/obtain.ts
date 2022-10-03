// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clothes = await prisma.clothesCategory.findMany()
    res.status(200).json(clothes);
  }
  catch (error) {
    res.status(500).json({ error: error })
    throw error;
  }
};

export default get;
