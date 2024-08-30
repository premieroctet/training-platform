import { Training } from "@prisma/client";

export const getCourseCover = (course: Training) => {
  try {
    const cover = require(`${__dirname}/../../courses/${course?.slug}/assets/cover.png`);
    return encodeURI(cover.default.src);
  } catch (error) {
    console.log("Error while getting course cover", error);
  }
};
