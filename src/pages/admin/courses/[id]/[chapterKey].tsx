import Layout from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import { inferSSRProps } from "@/lib/inferNextProps";
import path from "path";
import fs from "fs";
import MDXProvider from "../../../../components/mdx/MDXProvider";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import { MDEditorProps } from "@uiw/react-md-editor";
import { useState } from "react";

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const EditCourseChapter = ({
  filename,
  chapterContent,
}: inferSSRProps<typeof getServerSideProps>) => {
  const [value, setValue] = useState(chapterContent);

  // const MDXContent = useMemo(
  //   () => dynamic(() => import(`../../../../../courses/${filename}`)),
  //   [filename]
  // );

  console.log(filename);

  return (
    <Layout>
      <div data-color-mode="light">
        <MDXProvider>
          <MDEditor
            value={value}
            onChange={(e) => setValue(e as string)}
            height="90vh"
          />
        </MDXProvider>
      </div>
    </Layout>
  );
};

export default EditCourseChapter;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await checkIsConnected(context);

  const id = context.params!.id as string;
  const selectChapter = Number(context.params!.chapterKey);

  const course = await prisma.training.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const chapters = fs
    .readdirSync(path.join(process.cwd(), "courses", `${course.courseFile}`))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));

  const filename = path.join(
    `${course.courseFile}`,
    `${chapters[selectChapter]}.mdx`
  );

  const chapterContent = fs.readFileSync(
    path.join(process.cwd(), "courses", `${filename}`),
    "utf8"
  );

  return {
    props: { filename, selectChapter, chapters, chapterContent },
  };
}
