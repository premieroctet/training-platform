import Layout from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import { inferSSRProps } from "@/lib/inferNextProps";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import { MDEditorProps } from "@uiw/react-md-editor";
import { useState } from "react";
import { Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MDXProviderPreview from "@/components/mdx/MDXProviderPreview";
import "@uiw/react-md-editor/dist/mdeditor.min.css";
import "@uiw/react-markdown-preview/dist/markdown.min.css";

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const EditCourseChapter = ({
  chapterContent,
  selectChapter,
  chapters,
  filename,
  course,
}: inferSSRProps<typeof getServerSideProps>) => {
  const [value, setValue] = useState(chapterContent);
  const [isLoading, setLoading] = useState(false);

  const MDContent = dynamic(
    () =>
      import(
        `../../../../../courses/${course.courseFile}/${chapters[selectChapter]}.mdx`
      )
  );

  const router = useRouter();
  const toast = useToast();

  const saveMdxContent = async () => {
    setLoading(true);

    try {
      await fetch(`/api/courses/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value, filename: filename }),
      });
      setLoading(false);
      router.replace(router.asPath);
      toast({
        title: "Le contenu a été modifié !",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Une erreur est survenue",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Flex
        w="100%"
        h="100%"
        alignItems="stretch"
        flex={1}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Flex my="sm" px="md" align="center" justify="center" w="100%">
          <Button
            colorScheme="primary"
            isDisabled={selectChapter === 0}
            onClick={() =>
              router.push(
                "/admin/courses/" + course!.id + "/" + `${selectChapter - 1}`
              )
            }
          >
            {"<"} Précédent
          </Button>
          <Spacer />
          <Button
            mx="md"
            colorScheme="secondary"
            isDisabled={chapterContent === value}
            isLoading={isLoading}
            onClick={() => saveMdxContent()}
          >
            Sauvegarder
          </Button>
          <Spacer />
          <Button
            colorScheme="primary"
            isDisabled={selectChapter === chapters.length - 1}
            onClick={() =>
              router.push(
                "/admin/courses/" + course!.id + "/" + `${selectChapter + 1}`
              )
            }
          >
            Suivant {">"}
          </Button>
        </Flex>
        <Flex
          h="100%"
          data-color-mode="light"
          alignItems="stretch"
          flexdir="column"
          w="100%"
          flex={1}
        >
          <Flex
            w="100%"
            align="center"
            h="100%"
            flex={1}
            justify="center"
            alignItems="stretch"
          >
            <Flex w="100%" h="100%" flex={1} align="center" justify="center">
              <MDEditor
                value={value}
                preview="edit"
                height="100%"
                overflow
                onChange={(e) => setValue(e as string)}
                style={{ width: "100%" }}
              />
            </Flex>
            <Flex w="100%" ml="xs" flex={1} align="center" justify="center">
              <MDXProviderPreview>
                <MDContent />
              </MDXProviderPreview>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
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
    props: { filename, selectChapter, chapters, chapterContent, course },
  };
}
