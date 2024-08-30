import { Training } from "@prisma/client";

export const getCourseCover = (course: Training) => {
  const cover = require(`${__dirname}/../../courses/${course?.slug}/assets/cover.png`);
  return encodeURI(cover.default.src);
};
