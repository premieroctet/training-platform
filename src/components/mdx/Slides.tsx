import { Box, Flex, HStack, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useSlidesContext } from "@/context/SlidesContext";
import { useSocketContext } from "@/context/SocketContext";
import useSlideRatioStyle from "@/hooks/useSlideRatioStyle";
import { getSlidesFromMdxElements } from "@/lib/mdx";
import Slide from "./Slide";
import Timer from "./Timer";
import SpeakerFooter from "./SpeakerFooter";

interface SlidesProps {
  children: React.ReactChildren;
  title: string;
  course?: string;
}

const Slides: React.FC<SlidesProps> = ({ children, title, course }) => {
  const router = useRouter();
  const { setTotalSlides, currentMode, currentSlide } = useSlidesContext();
  const { slideWidth, slideHeight } = useSlideRatioStyle();
  const { slides, notes } = getSlidesFromMdxElements(
    children as React.ReactElement[]
  );
  useEffect(() => {
    setTotalSlides(slides.length);
  });

  const { user } = useSocketContext();
  const isAdmin = user?.isAdmin;

  const footer = `${
    course ? course : "Formation"
  } - Premier Octet | ${new Date().toLocaleDateString("fr", {
    year: "numeric",
    month: "long",
  })}`;

  const print =
    process.browser &&
    window.location.search &&
    new URLSearchParams(window.location.search).get("print") !== null;

  const pagination: string = `${currentSlide + 1}/${slides.length}`;
  const nextSlide = slides[currentSlide + 1];
  const isPreview: boolean =
    (!print && router.query.mode && currentMode === "speaker") || false;

  return (
    <>
      {print ? (
        slides.map(
          // @ts-ignore
          (slide, key) => (
            <Slide
              key={key}
              title={title}
              footer={footer}
              pagination={pagination}
              print={print}
              printPagination={key + 1}
            >
              {slide}
            </Slide>
          )
        )
      ) : (
        <Flex
          className="slides"
          display="flex"
          height="100%"
          flexDirection="column"
          alignItems="center"
          gridGap="md"
          m="1px"
        >
          {isPreview && isAdmin ? (
            <HStack position="relative" height="100%" width="100%">
              <VStack justifyContent="space-between" h="100%" w="65%">
                <Slide
                  title={title}
                  footer={footer}
                  pagination={pagination}
                  isAdmin
                  containerProps={{
                    width: `calc(${slideWidth}*60%)`,
                    height: `calc(${slideHeight}*60%)`,
                    minWidth: "100%",
                    minHeight: "70%",
                    boxShadow: "base",
                  }}
                >
                  {slides[currentSlide]}
                </Slide>

                <SpeakerFooter />
              </VStack>

              <VStack height="100%" width="35%">
                <Box height="40%" width="100%">
                  {nextSlide ? (
                    <Slide
                      title={title}
                      footer={footer}
                      pagination={pagination}
                      preview
                      containerProps={{
                        maxWidth: `calc(${slideWidth}*30%)`,
                        maxHeight: `calc(${slideHeight}*30%)`,
                        boxShadow: "base",
                      }}
                    >
                      {nextSlide}
                    </Slide>
                  ) : (
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      fontSize="2em"
                      boxShadow="base"
                    >
                      END
                    </Flex>
                  )}
                </Box>
                <Timer />
                <Flex
                  flexDir="column"
                  justifyContent="flex-end"
                  alignItems="stretch"
                  height="60%"
                  width="100%"
                  boxShadow="base"
                >
                  {notes[currentSlide]}
                </Flex>
              </VStack>
            </HStack>
          ) : (
            <Slide
              title={title}
              footer={footer}
              pagination={pagination}
              containerProps={{
                maxWidth: "100%",
                width: slideWidth,
                height: slideHeight,
              }}
            >
              {slides[currentSlide]}
            </Slide>
          )}
        </Flex>
      )}
    </>
  );
};

export default Slides;
