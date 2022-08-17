import { readFileSync } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import slugify from "slugify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    const coursename = slugify(req.query.course as string);

    const filePath = coursename + ".pdf";

    res.setHeader(
      "content-disposition",
      `attachment; filename=${coursename}.pdf`
    );

    const data = readFileSync(path.join(process.cwd(), "pdfs", filePath));
    res.status(200).send(data);
  } else {
    res.status(401);
  }
  res.end();
};
