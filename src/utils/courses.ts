import { CourseType } from "src/pages";

export const getCourseCover = (course: CourseType) => {
  const cover = require(`../../courses/${
    course.info?.courseFile ?? course?.title
  }/assets/cover.png`);
  return encodeURI(cover.default.src);
};
