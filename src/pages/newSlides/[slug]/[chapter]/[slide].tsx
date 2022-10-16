import { Flex, Stack, Center } from "@chakra-ui/layout";
import {
  Button,
  ChakraProvider as CustomChakraProvider,
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

import Slides from "@/components/mdx/Slides";

import { useRouter } from "next/router";
import SlideTemplate from "@/components/templates/SlideTemplate";

type ChapterPageProps = {
  session?: Session | null | undefined;
  filename: string;
  course: CourseType;
  currentChapter: string;
  chapters: string[];
};

export default function SlidePage({ filename }: ChapterPageProps) {
  const [course, setCourse] = useState<CourseQuery["course"]>();
  const router = useRouter();
  const { chapter, slide } = router?.query;

  const getCourse = async () => {
    const course = await client.queries.course({ relativePath: filename });
    setCourse(course.data.course);
  };

  useEffect(() => {
    getCourse();
  }, []);

  const chapterIndex = +chapter - 1;
  const slideIndex = +slide - 1;
  const currentChapter = course && course.chapters[chapterIndex];
  const currentSlide = currentChapter && currentChapter.slides[slideIndex];

  console.log("currentSlide-------------", currentSlide);

  if (course && !currentSlide) return <p>CETTE SLIDE N'EXISTE PAS !</p>;
  if (currentSlide)
    return (
      <>
        <Center>
          <Button
            onClick={() => {
              router.push({
                pathname: router?.pathname,
                query: {
                  ...router?.query,
                  slide: +slide - 1,
                },
              });
            }}
          >
            -
          </Button>
          <Button
            onClick={() => {
              router.push({
                pathname: router?.pathname,
                query: {
                  ...router?.query,
                  slide: +slide + 1,
                },
              });
            }}
          >
            +
          </Button>
        </Center>

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
              flexGrow={4}
            >
              <Slides
                title={currentChapter?.title}
                course={course.course_title}
                subtitle={course?.course_subtitle}
              >
                <SlideTemplate slide={currentSlide} />
              </Slides>
            </Stack>
          </CustomChakraProvider>
        </Flex>
      </>
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
