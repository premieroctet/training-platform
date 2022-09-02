import Layout from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import { inferSSRProps } from "@/lib/inferNextProps";
import MDXProvider from "../../../../components/mdx/MDXProvider";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import { MDEditorProps } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
  course,
}: inferSSRProps<typeof getServerSideProps>) => {
  const [value, setValue] = useState(chapterContent);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    setValue(chapterContent);
  }, [chapterContent]);

  const saveMdxContent = async () => {
    setLoading(true);

    try {
      await fetch(`/api/courses/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: value,
          chapterId: chapters[selectChapter].id,
        }),
      });
      router.replace(router.asPath);
      setLoading(false);
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
      <Flex my="sm" px="md" align="center" justify="center" w="100%">
        <Button
          colorScheme="primary"
          isDisabled={selectChapter === 0}
          onClick={() => {
            router.push(
              "/admin/courses/" + course!.id + "/" + `${selectChapter - 1}`
            );
          }}
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
          onClick={() => {
            router.push(
              "/admin/courses/" + course!.id + "/" + `${selectChapter + 1}`
            );
          }}
        >
          Suivant {">"}
        </Button>
      </Flex>
      <div data-color-mode="light">
        <MDXProvider>
          <MDEditor
            value={value}
            onChange={(e) => setValue(e as string)}
            height="85vh"
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

  const chaptersData = await prisma.chapters.findMany({
    where: {
      trainingId: course.id,
    },
  });

  const chapterContent = chaptersData.filter((e) => e.pageId === selectChapter);

  if (chapterContent.length <= 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      selectChapter,
      chapters: chaptersData,
      chapterContent: chapterContent[0].content,
      course,
    },
  };
}
