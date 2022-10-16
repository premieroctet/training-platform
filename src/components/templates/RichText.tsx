import type { TinaTemplate } from "tinacms";

export const RichTextSchema: TinaTemplate = {
  label: "Rich Text",
  name: "richText",
  ui: {
    defaultValue: {
      text: "Nouveau block texte",
    },
  },
  fields: [
    {
      label: "Texte",
      name: "text",
      type: "rich-text",
    },
  ],
};
