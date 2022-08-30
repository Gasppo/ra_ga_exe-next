// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const clothes = await prisma.clothesCategory.findMany()
  res.status(200).json(clothes);
};

export default examples;
