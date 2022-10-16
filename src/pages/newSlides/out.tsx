import { CourseQuery } from ".tina/__generated__/types";
import React from "react";
import TitleSlide from "./TitleSlide";

export const Slides = (props: CourseQuery["course"]) => {
  return (
    <>
      {props.slides
        ? props.slides.map(function (slide, i) {
            switch (slide?.__typename) {
              case "CourseSlidesTitle":
                return (
                  <React.Fragment key={i + slide?.__typename}>
                    <TitleSlide data={slide} />
                  </React.Fragment>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
