import dynamic from "next/dynamic";
import { CourseType } from "src/pages";
import MDXProvider from "./mdx/MDXProvider";

const CourseMapPreview = ({ course }: { course: CourseType }) => {
  const MDContent = dynamic(
    () => import(`../../courses/${course.title}/${course.courseMap}`)
  );

  return (
    <>
      {course.courseMap && (
        <MDXProvider courseMap>
          <MDContent />
        </MDXProvider>
      )}
    </>
  );
};

export default CourseMapPreview;
