import dynamic from "next/dynamic";
import MDXProvider from "./mdx/MDXProvider";
import { CourseType } from "./CourseCard";

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
