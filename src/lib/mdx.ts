import { Children, ReactElement } from "react";

export type GeneratedSlides = Array<ReactElement[]> | [];

export const getSlidesFromMdxElements = (children: ReactElement[]) => {
  let generatedSlides: GeneratedSlides = [];
  let generatedNotes: GeneratedSlides = [];
  let generatorCount: number = 0;

  Children.map(children, (child: ReactElement) => {
    // Check for <hr> element to separate slides
    const childType = child && child.props && (child.props.mdxType || []);
    if (childType && childType.includes("hr")) {
      generatorCount += 1;
      return;
    }

    if (!Array.isArray(generatedSlides[generatorCount])) {
      generatedSlides[generatorCount] = [];
      generatedNotes[generatorCount] = [];
    }

    if (childType && childType.includes("Notes")) {
      // Add notes to generated notes
      generatedNotes[generatorCount].push(child);
    } else {
      // Add slide content to current generated slide
      generatedSlides[generatorCount].push(child);
    }
  });

  return { slides: generatedSlides, notes: generatedNotes };
};
