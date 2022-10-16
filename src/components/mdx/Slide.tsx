import { useSlidesContext } from "@/context/SlidesContext";
import useSlideRatioStyle from "@/hooks/useSlideRatioStyle";
import { Box, Flex, FlexProps } from "@chakra-ui/layout";
import React from "react";
import SlideHeader from "./SlideHeader";

interface SlideProps {
  children: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >[];
  preview?: boolean;
  isAdmin?: boolean;
  title: string;
  footer: string;
  pagination: string;
  print?: boolean;
  printPagination?: number;
  containerProps?: FlexProps;
}

const Slide: React.FC<SlideProps> = ({
  children,
  preview = false,
  isAdmin = false,
  title,
  footer,
  pagination,
  print,
  printPagination,
  containerProps,
}) => {
  const hasHeader = children && children[0] && children[0]?.props?.slideTitle;
  const isChapterHeading =
    children && children[0] && children[0]?.props?.mdxType === "ChapterHeading";

  const header = !isChapterHeading && hasHeader ? children.shift() : null;
  const fontSize = () => {
    if (preview) return 1.4;
    if (isAdmin) return 2.5;
    else return 3.75;
  };
  const { isLandscape, ratio } = useSlideRatioStyle();
  const { currentMode } = useSlidesContext();
  const isSlideshow = currentMode !== "speaker";
  return (
    <Flex
      className="slide"
      position={isSlideshow ? "inherit" : "relative"}
      overflowY={isSlideshow ? "inherit" : "hidden"}
      boxSizing="border-box"
      flexDirection="column"
      alignItems="stretch"
      fontSize={
        isLandscape ? `${fontSize()}vh` : `calc(${fontSize()}vw * ${ratio})`
      }
      height={print ? "99vh" : "100%"}
      {...containerProps}
    >
      {(!isChapterHeading && (
        <Flex
          boxSizing="border-box"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <SlideHeader
            slideTitle={hasHeader && header ? header?.props?.slideTitle : title}
          />
          <Flex
            flexDirection="column"
            justifyContent="center"
            marginRight="auto"
            height="100%"
            width="100%"
            p="1em 3em"
          >
            {children}
          </Flex>
          <Flex
            position="absolute"
            bottom="0"
            width="100%"
            justifyContent="space-between"
            color="gray.400"
            p="1em"
          >
            <Box fontSize="0.8em">{footer}</Box>
            <Box fontSize="0.8em">
              {printPagination ? printPagination : pagination}
            </Box>
          </Flex>
        </Flex>
      )) ||
        children}
    </Flex>
  );
};

export default Slide;
