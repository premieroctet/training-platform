import type { TinaTemplate } from "tinacms";

export const CheckListSchema: TinaTemplate = {
  label: "Check List",
  name: "checkList",
  ui: {
    defaultValue: {
      itemText: "Nouvel item",
    },
  },
  fields: [
    {
      label: "Texte du nouvel item",
      name: "itemText",
      type: "string",
    },
  ],
};
