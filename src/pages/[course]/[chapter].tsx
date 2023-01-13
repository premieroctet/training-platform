import Layout from "@/components/Layout";
import Controls from "@/components/mdx/Controls";
import FollowingFeedbackDot from "@/components/mdx/FollowingFeedbackDot";
import MDXProvider from "@/components/mdx/MDXProvider";
import SideBar from "@/components/mdx/SideBar";
import { SlidesProvider } from "@/context/SlidesContext";
import { SocketProvider } from "@/context/SocketContext";
import prisma from "@/lib/prisma";
import { Flex, Stack } from "@chakra-ui/layout";
import {
  ChakraProvider as CustomChakraProvider,
  useDisclosure,
} from "@chakra-ui/react";
import "@fontsource/josefin-sans";
import "@fontsource/josefin-sans/700.css";
import fs from "fs";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { useMemo } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { CourseType } from "..";
import premierOctet from "../../theme/premierOctet";

type ChapterPageProps = {
  filename: string;
  course: CourseType;
  currentChapter: string;
  chapters: string[];
};

export default function ChapterPage({
  filename,
  course,
  currentChapter,
  chapters,
}: ChapterPageProps) {
  const [session] = useSession();
  const router = useRouter();
  const MDXContent = useMemo(
    () => dynamic(() => import(`../../../courses/${filename}`)),
    [filename]
  );
  const handleFullScreen = useFullScreenHandle();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const isAdmin = session?.user?.role === "admin" ?? false;
  const isFollowing = router.query.mode === "follow";
  const isPrint = router.query.hasOwnProperty("print");

  return (
    <SocketProvider session={session}>
      <SlidesProvider
        course={course}
        chapters={chapters}
        chapter={currentChapter}
        isAdmin={isAdmin}
      >
        <FullScreen className="fullscreen-component" handle={handleFullScreen}>
          <Layout title={course?.title}>
            <Flex
              w="100vw"
              h="100vh"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <FollowingFeedbackDot isFollowing={isFollowing} />
              {!isPrint && (
                <SideBar
                  course={course}
                  currentChapter={currentChapter}
                  chapters={chapters}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              )}

              <CustomChakraProvider
                theme={premierOctet}
                cssVarsRoot="#slides-container"
              >
                <Stack
                  position="relative"
                  fontFamily="Josefin Sans"
                  id="slides-container"
                  flexGrow={4}
                >
                  <MDXProvider>
                    <MDXContent />
                  </MDXProvider>
                  {!isPrint && (
                    <Controls
                      handleFullScreen={handleFullScreen}
                      toggleSideBar={onToggle}
                      isAdmin={isAdmin}
                    />
                  )}
                </Stack>
              </CustomChakraProvider>
            </Flex>
          </Layout>
        </FullScreen>
      </SlidesProvider>
    </SocketProvider>
  );
}

interface IParams extends ParsedUrlQuery {
  course: string;
  chapter: string;
}

export async function getStaticPaths() {
  const courseSlugs = ["typescript"];
  const paths: { params: { course: string; chapter: string } }[] = [];

  courseSlugs.forEach((slug) => {
    const chapters = fs
      .readdirSync(path.join(process.cwd(), "courses", slug))
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => name.replace(".mdx", ""));

    chapters.forEach((chapterName) => {
      paths.push({ params: { course: slug, chapter: chapterName } });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { course, chapter } = context.params as IParams;

  const courseInfo = await prisma.training.findUnique({
    where: {
      slug: course as string,
    },
  });

  const filename = path.join(`${course}`, `${chapter}.mdx`);
  const chapters = fs
    .readdirSync(path.join(process.cwd(), "courses", `${courseInfo?.slug}`))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));

  return {
    props: {
      filename,
      course: courseInfo,
      currentChapter: chapter,
      chapters,
    },
  };
};
