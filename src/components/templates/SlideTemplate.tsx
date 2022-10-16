import ChapterHeading from "@/components/mdx/ChapterHeading";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { classicElements } from "@/components/mdx/MDXProvider";

// Switch between slide templates
const SlideTemplate = ({ slide }) => {
  const getTemplate = () => {
    switch (slide.__typename) {
      case "CourseChaptersChapterSlidesEmpty":
        return (
          <TinaMarkdown content={slide.body} components={classicElements} />
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
  return <>{getTemplate()}</>;
};

export default SlideTemplate;
