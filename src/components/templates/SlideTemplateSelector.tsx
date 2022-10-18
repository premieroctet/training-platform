import { TinaMarkdown } from "tinacms/dist/rich-text";
import { classicElements } from "@/components/mdx/MDXProvider";
import customComponents from "./templates";
import { Box } from "@chakra-ui/react";
import ChapterHeading from "./ChapterHeading";

// Switch between slide templates
const SlideTemplateSelector = ({ slide }: { slide: any }) => {
  const getTemplate = () => {
    switch (slide.__typename) {
      case "CourseChaptersChapterSlidesEmpty":
        return (
          <TinaMarkdown
            content={slide.body}
            components={{ ...classicElements, ...customComponents }}
          />
        );
      case "CourseChaptersChapterSlidesChapterHeading":
        return (
          <ChapterHeading
            title={slide?.title}
            subtitle={slide?.subtitle}
            imgSrc={slide?.imgSrc}
          />
        );
      default:
        return null;
    }
  };
  return <Box>{getTemplate()}</Box>;
};

export default SlideTemplateSelector;
