import { Training } from "@prisma/client";

export const getCourseCover = (course: Training) => {
  const cover = require(`../../courses/${course?.slug}/assets/cover.png`);
  return encodeURI(cover.default.src);
};
