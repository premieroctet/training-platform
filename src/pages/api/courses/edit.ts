import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  async function updateCourseContent() {
    await prisma.chapters.update({
      where: {
        id: body.chapterId,
      },
      data: {
        content: body.content,
      },
    });

    res.status(200).end(`Updated successfully !`);
  }

  switch (method) {
    case "PUT":
      updateCourseContent();
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
