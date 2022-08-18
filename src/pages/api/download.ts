import { readFileSync, existsSync, statSync } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import slugify from "slugify";
import { generatePdf } from "src/utils/pdf";
import prisma from "@/lib/prisma";

const downloadPdf = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    const id = req.query.id as string;
    const courseInfo = await prisma.training.findUnique({
      where: {
        id,
      },
    });
    const courseName = courseInfo?.courseFile!;
    const slug = slugify(courseName);
    const coursePdfPath = path.join(process.cwd(), "pdfs", slug + ".pdf");
    const hasPdf = existsSync(coursePdfPath);
    const isOutdated =
      hasPdf &&
      courseInfo?.updatedAt &&
      statSync(coursePdfPath).mtime.getTime() <
        courseInfo?.updatedAt?.getTime();

    if (!hasPdf || isOutdated) {
      await generatePdf(courseName);
    }

    const filePath = slug + ".pdf";

    res.setHeader("content-disposition", `attachment; filename=${slug}.pdf`);

    const data = readFileSync(path.join(process.cwd(), "pdfs", filePath));
    res.send(data);
  }
  res.status(401);
};

export default downloadPdf;
