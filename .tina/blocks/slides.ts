import type { TinaTemplate } from "tinacms";
import { CheckListSchema } from "../../src/components/templates/schema";

export const emptySlideTemplate: TinaTemplate = {
  name: "empty",
  label: "Slide libre",
  ui: {
    defaultItem: {
      title: "Nouvelle slide libre",
      subtitle: "Sous titre slide",
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
      type: "rich-text",
      label: "Contenu de la slide",
      name: "body",
      templates: [CheckListSchema],
    },
    {
      type: "string",
      label: "Notes",
      name: "notes",
    },
  ],
};

export const chapterHeading: TinaTemplate = {
  name: "chapterHeading",
  label: "Titre Chapitre",
  ui: {
    defaultItem: {
      title: "Nouvelle slide titre chapitre",
      subtitle: "Sous titre slide",
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
      type: "image",
      label: "Image d'arrière plan",
      name: "imgSrc",
      isBody: true,
    },
  ],
};
