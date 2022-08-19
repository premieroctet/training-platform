import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  function readWriteSync() {
    fs.writeFileSync(
      path.join(process.cwd(), "courses", `${body.filename}`),
      body.content,
      "utf-8"
    );

    res.json({ message: "Updated successfully !" });
  }

  switch (method) {
    case "PUT":
      readWriteSync();
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
