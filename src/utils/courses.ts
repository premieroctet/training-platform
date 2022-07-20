import { CourseType } from "@/components/CourseCard";

export const getCourseCover = (course: CourseType) => {
  const cover = require(`../../courses/${course.title}/assets/cover.png`);
  return encodeURI(cover.default.src);
};
