import { Flex, Stack } from "@chakra-ui/layout";
import {
  ChakraProvider as CustomChakraProvider,
  useDisclosure,
} from "@chakra-ui/react";
import "@fontsource/josefin-sans";
import "@fontsource/josefin-sans/700.css";
import fs from "fs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { useMemo } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Layout from "@/components/Layout";
import Controls from "@/components/mdx/Controls";
import FollowingFeedbackDot from "@/components/mdx/FollowingFeedbackDot";
import MDXProvider from "@/components/mdx/MDXProvider";
import SideBar from "@/components/mdx/SideBar";
import { SlidesProvider } from "@/context/SlidesContext";
import { SocketProvider } from "@/context/SocketContext";
import premierOctet from "../../theme/premierOctet";
import { CourseType } from "..";
import prisma from "@/lib/prisma";

type ChapterPageProps = {
  session?: Session | null | undefined;
  filename: string;
  course: CourseType;
  currentChapter: string;
  chapters: string[];
};

export default function ChapterPage({
  session,
  filename,
  course,
  currentChapter,
  chapters,
}: ChapterPageProps) {
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
        {/* @ts-expect-error */}
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const isExporting =
    process.env.NODE_ENV === "development" &&
    context.req.headers["context"] === "pdf-export";

  const { course, chapter } = context.params as IParams;

  const courseInfo = await prisma.training.findUnique({
    where: {
      slug: course as string,
    },
  });

  if (
    (course && !session && !isExporting) ||
    (session &&
      !(session.user?.role === "admin") &&
      !session.user?.courses?.includes(courseInfo!.title) &&
      !isExporting)
  ) {
    return {
      redirect: {
        destination: "/auth/unauthorized",
        permanent: false,
      },
    };
  }
  const filename = path.join(`${course}`, `${chapter}.mdx`);
  const chapters = fs
    .readdirSync(path.join(process.cwd(), "courses", `${courseInfo?.slug}`))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));

  return {
    props: {
      session,
      filename,
      course: courseInfo,
      currentChapter: chapter,
      chapters,
    },
  };
};
