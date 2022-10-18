import { Box, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useSlidesContext } from "@/context/SlidesContext";
import useSlideRatioStyle from "@/hooks/useSlideRatioStyle";
import { getSlidesFromMdxElements } from "@/lib/mdx";
import Slide from "../mdx/Slide";

interface SlidesProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  course?: string;
  totalSlides?: number;
}

const SlidesWrapper: React.FC<SlidesProps> = ({
  children,
  title,
  course,
  subtitle,
  totalSlides,
}) => {
  const router = useRouter();
  const { slide } = router?.query;
  const { setTotalSlides } = useSlidesContext();
  const { slideWidth, slideHeight } = useSlideRatioStyle();
  const { slides: currentSlide } = getSlidesFromMdxElements(
    children as React.ReactElement[]
  );

  useEffect(() => {
    setTotalSlides(totalSlides);
  });

  const footer = `${course ? course : "Formation"} ${`${
    subtitle ? "- " + subtitle : ""
  }`} | ${new Date().toLocaleDateString("fr", {
    year: "numeric",
    month: "long",
  })}`;

  const pagination: string = `${slide}/${totalSlides}`;

  return (
    <>
      <Flex
        className="slides"
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        gridGap="md"
        m="1px"
      >
        {/* @ts-ignore */}
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
          <Box>{currentSlide}</Box>
        </Slide>
      </Flex>
    </>
  );
};

export default SlidesWrapper;
