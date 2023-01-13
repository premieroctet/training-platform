import "@fontsource/josefin-sans";
import "@fontsource/josefin-sans/700.css";
import fs from "fs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import path from "path";

import prisma from "@/lib/prisma";

const App = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { course } = context.query;

  const courseInfo = await prisma.training.findUnique({
    where: {
      slug: course as string,
    },
  });

  const chapters = fs
    .readdirSync(path.join(process.cwd(), "courses", `${courseInfo?.slug}`))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));

  return {
    redirect: {
      permanent: false,
      destination: `/${course}/${chapters[0]}`,
    },
  };
};

export default App;
