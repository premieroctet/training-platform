import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

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
      const result = await prisma.user.update({
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
        await prisma.user.delete({
          //@ts-ignore
          where: { id },
        });
        res.status(200).json({ id });
      } catch (error) {
        throw new Error("Error deleting user");
      }

      break;
    default:
      res.setHeader("Allow", ["DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
