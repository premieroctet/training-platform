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
import { useEffect, useState } from "react";
import { Button, Flex, Spacer, Text, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/dist/mdeditor.min.css";
import "@uiw/react-markdown-preview/dist/markdown.min.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const EditCourseChapter = ({
  chapterContent,
  chapterKey,
  chapters,
  filename,
  course,
}: inferSSRProps<typeof getServerSideProps>) => {
  const [initialContent, setInitialContent] = useState(
    chapterContent.split("---")
  );
  const [value, setValue] = useState(chapterContent.split("---"));
  const [isLoading, setLoading] = useState(false);
  const hasChanges = !value.every((val, idx) => initialContent[idx] == val);

  const router = useRouter();
  const toast = useToast();
  const saveMdxContent = async () => {
    setLoading(true);

    try {
      await fetch(`/api/courses/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: value.join("---"),
          filename: filename,
        }),
      });
      setLoading(false);
      toast({
        title: "Le contenu a été modifié !",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setInitialContent(value);
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

  useEffect(() => {
    setValue(chapterContent.split("---"));
    setInitialContent(chapterContent.split("---"));
  }, [chapterContent]);

  return (
    <Layout>
      <Flex my="sm" px="md" align="center" justify="center" w="100%">
        <Button
          colorScheme="primary"
          isDisabled={+chapterKey === 0}
          onClick={() =>
            router.push({
              pathname: "/admin/courses/[slug]/[chapterKey]",
              query: {
                slug: course!.slug,
                chapterKey: +chapterKey - 1,
              },
            })
          }
        >
          <ChevronLeftIcon />
        </Button>
        <Spacer />
        <VStack>
          <Button
            mx="md"
            colorScheme="secondary"
            fontSize={"sm"}
            isDisabled={!hasChanges}
            isLoading={isLoading}
            onClick={() => saveMdxContent()}
          >
            Sauvegarder
          </Button>
          {hasChanges && (
            <p>Vous avez des changements non sauvegardés sur ce chapitre</p>
          )}
        </VStack>
        <Spacer />
        <Button
          colorScheme="primary"
          isDisabled={+chapterKey === chapters.length - 1}
          onClick={() =>
            router.push({
              pathname: "/admin/courses/[slug]/[chapterKey]",
              query: {
                slug: course!.slug,
                chapterKey: +chapterKey + 1,
              },
            })
          }
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
      {value.map((val, idx) => (
        <div data-color-mode="light" key={idx}>
          <Text fontSize="md" fontWeight="bold" p={2}>
            Slide n°{idx + 1}
          </Text>
          <MDXProvider>
            <MDEditor
              value={val}
              onChange={(e) => {
                const newValue = [...value];
                newValue[idx] = e!;
                setValue(newValue);
              }}
              height="85vh"
            />
          </MDXProvider>
        </div>
      ))}
    </Layout>
  );
};

export default EditCourseChapter;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await checkIsConnected({ context });

  const slug = context.params!.slug as string;
  const chapterKey = context.params!.chapterKey as string;

  const course = await prisma.training.findUnique({
    where: {
      slug,
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
    .readdirSync(path.join(process.cwd(), "courses", `${course.slug}`))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));

  const filename = path.join(`${course.slug}`, `${chapters[+chapterKey]}.mdx`);

  const chapterContent = fs.readFileSync(
    path.join(process.cwd(), "courses", `${filename}`),
    "utf8"
  );

  return {
    props: { filename, chapterKey, chapters, chapterContent, course },
  };
}
