import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  let result;

  switch (method) {
    case "GET":
      result = await prisma.user.findMany();
      res.json(result);

      break;
    case "POST":
      const user = await prisma.user.findUnique({
        where: { email: body?.email },
      });
      if (user) {
        res.status(500).send({ error: "Cet email est déjà utilisé." });
      } else {
        result = await prisma.user.create({
          data: { ...body, role: body.role || "trainee" },
        });
        res.json(result);
      }

      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
