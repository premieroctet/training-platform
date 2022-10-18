import { defineSchema, defineConfig } from "tinacms";
import { client } from "./__generated__/client";
import slugify from "slugify";
import { chapter } from "./blocks/chapters";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token: process.env.NEXT_PUBLIC_TINA_TOKEN, // generated on app.tina.io,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENTID, // generated on app.tina.io
    branch,
    media: {
      tina: {
        publicFolder: "public",
        mediaRoot: "uploads",
      },
    },
  },

  collections: [
    {
      label: "Cours",
      name: "course",
      path: "courses",
      format: "mdx",
      ui: {
        filename: {
          readonly: true,
          // Example of using a custom slugify function
          slugify: (values) => {
            // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
            return `${
              values?.course_title
                ? slugify(values?.course_title?.toLowerCase())
                : "titre_du_cours"
            }`;
          },
        },
      },
      fields: [
        {
          type: "string",
          label: "Titre du cours",
          name: "course_title",
          required: true,
        },
        {
          type: "string",
          label: "Sous titre du cours",
          name: "course_subtitle",
        },
        {
          type: "string",
          label: "Description du cours",
          name: "course_description",
        },
        {
          type: "object",
          list: true,
          name: "chapters",
          label: "Chapitres",
          templates: [chapter],
        },
      ],
    },
  ],
});

export default schema;

export const tinaConfig = defineConfig({
  client,
  schema,
  //@ts-ignore
  cmsCallback: (cms) => {
    import("react-tinacms-editor").then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin);
    });
  },
});
