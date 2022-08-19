import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  let result;

  switch (method) {
    case "GET":
      result = await prisma.training.findMany();
      res.json(result);

      break;
    case "POST":
      result = await prisma.training.create({
        data: {
          ...body,
          slug: slugify(body?.title),
        },
      });
      res.json(result);

      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
