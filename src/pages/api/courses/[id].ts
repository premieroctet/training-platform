import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case "PUT":
      const result = await prisma.training.update({
        where: {
          //@ts-ignore
          id: id,
        },
        data: body,
      });
      res.json(result);
      break;
    case "DELETE":
      try {
        await prisma.training.delete({
          //@ts-ignore
          where: { id },
        });
        res.status(200).json({ id });
      } catch (error) {
        throw new Error("Error adding new user");
      }

      break;
    default:
      res.setHeader("Allow", ["DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
