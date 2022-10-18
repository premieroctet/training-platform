import type { TinaTemplate } from "tinacms";
import { emptySlideTemplate, chapterHeading } from "./slides";

export const chapter: TinaTemplate = {
  name: "chapter",
  label: "Chapitre",
  ui: {
    defaultItem: {
      title: "Titre du chapitre",
      subtitle: "Sous titre du chapitre",
    },
    itemProps: (item) => {
      return { label: item?.title };
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "title",
    },
    {
      type: "string",
      label: "Sous titre",
      name: "subtitle",
    },
    {
      type: "object",
      list: true,
      name: "slides",
      label: "Slides",
      templates: [emptySlideTemplate, chapterHeading],
    },
  ],
};
