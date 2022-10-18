import { Flex, Stack, Box } from "@chakra-ui/layout";
import {
  ChakraProvider as CustomChakraProvider,
  useBoolean,
} from "@chakra-ui/react";
import "@fontsource/josefin-sans";
import "@fontsource/josefin-sans/700.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { CourseType } from "src/pages";
import premierOctet from "src/theme/premierOctet";
import client from "../../../../../.tina/__generated__/client";
import { CourseQuery } from ".tina/__generated__/types";

import { useRouter } from "next/router";
import SlideTemplateSelector from "@/components/templates/SlideTemplateSelector";
import SideBar from "@/components/mdx/SideBar";
import Controls from "@/components/mdx/Controls";
import { useFullScreenHandle } from "react-full-screen";
import SlidesWrapper from "@/components/templates/SlidesWrapper";

type ChapterPageProps = {
  session?: Session | null | undefined;
  filename: string;
  course: CourseType;
  currentChapter: string;
  chapters: string[];
};

export default function SlidePage({ filename, session }: ChapterPageProps) {
  const [course, setCourse] = useState<CourseQuery["course"]>();
  const router = useRouter();
  const { chapter, slide } = router?.query;
  const isPrint = router.query.hasOwnProperty("print");
  const [showSideBar, setSideBar] = useBoolean(false);
  const isAdmin = session?.user?.isAdmin ?? false;

  const getCourse = async () => {
    const course = await client.queries.course({ relativePath: filename });
    setCourse(course.data.course);
  };

  useEffect(() => {
    getCourse();
  }, []);

  const chapterIndex = +chapter - 1;
  const slideIndex = +slide - 1;
  const currentChapter = course?.chapters && course?.chapters[chapterIndex];
  const currentSlide =
    currentChapter?.slides && currentChapter?.slides[slideIndex];
  const handleFullScreen = useFullScreenHandle();

  const handleNavigation = (e: any) => {
    const maxSlides = currentChapter?.slides?.length ?? 0;
    const maxChapters = course?.chapters?.length ?? 0;

    const currentSlideNumber = parseInt(slide as string);
    const currentChapterNumber = parseInt(chapter as string);
    const hasPrevSlide = currentSlideNumber > 1;
    const hasNextSlide = currentSlideNumber < maxSlides;
    const hasPrevChapter = currentChapterNumber > 1;
    const hasNextChapter = currentChapterNumber < maxChapters;

    if (e.code === "ArrowRight") {
      if (hasNextSlide)
        router.push({
          pathname: router?.pathname,
          query: {
            ...router?.query,
            slide: currentSlideNumber + 1,
          },
        });
      else if (hasNextChapter) {
        router.push({
          pathname: router?.pathname,
          query: {
            ...router?.query,
            slide: 1,
            chapter: currentChapterNumber + 1,
          },
        });
      }
    } else if (e.code === "ArrowLeft") {
      if (hasPrevSlide)
        router.push({
          pathname: router?.pathname,
          query: {
            ...router?.query,
            slide: currentSlideNumber - 1,
          },
        });
      else if (hasPrevChapter) {
        router.push({
          pathname: router?.pathname,
          query: {
            ...router?.query,
            slide:
              // @ts-ignore
              (course?.chapters[currentChapterNumber - 1]?.slides?.length ??
                0) + 1,
            chapter: currentChapterNumber - 1,
          },
        });
      }
    }
  };

  if (course && !currentSlide)
    return (
      <Box tabIndex={0} onKeyDown={handleNavigation} height="100vh">
        <p>Rien à voir ici</p>
      </Box>
    );
  if (currentSlide)
    return (
      <Box tabIndex={0} onKeyDown={handleNavigation}>
        {!isPrint && (
          <SideBar
            // @ts-ignore
            course={course}
            // @ts-ignore
            currentChapter={currentChapter}
            // @ts-ignore
            chapters={course?.chapters?.map((chapter) => chapter?.title) ?? []}
            showSideBar={showSideBar}
            setSideBar={setSideBar}
          />
        )}

        <Flex
          w="100vw"
          h="100vh"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <CustomChakraProvider
            theme={premierOctet}
            cssVarsRoot="#slides-container"
          >
            <Stack
              position="relative"
              fontFamily="Josefin Sans"
              id="slides-container"
              width="100vw"
            >
              <SlidesWrapper
                title={currentChapter?.title!}
                course={course?.course_title}
                subtitle={course?.course_subtitle ?? undefined}
                totalSlides={currentChapter?.slides?.length}
              >
                <SlideTemplateSelector slide={currentSlide} />
              </SlidesWrapper>
              {!isPrint && (
                <Controls
                  handleFullScreen={handleFullScreen}
                  toggleSideBar={setSideBar.toggle}
                  isAdmin={isAdmin}
                />
              )}
            </Stack>
          </CustomChakraProvider>
        </Flex>
      </Box>
    );
  return null;
}

interface IParams extends ParsedUrlQuery {
  course: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const { slug } = context.params as IParams;

  return {
    props: {
      session,
      filename: slug + ".mdx",
    },
  };
};
