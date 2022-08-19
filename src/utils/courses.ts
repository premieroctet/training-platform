import { CourseType } from "src/pages";

export const getCourseCover = (course: CourseType) => {
  const cover = require(`../../courses/${course?.slug}/assets/cover.png`);
  return encodeURI(cover.default.src);
};
