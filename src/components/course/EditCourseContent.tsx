import { MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { useState } from "react";
import MDXProvider from "../mdx/MDXProvider";

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface EditCourseContentProps {
  filename: string;
}

const EditCourseContent = ({ filename }: EditCourseContentProps) => {
  const [value, setValue] = useState("**Hello world!!!**");

  console.log(filename);

  return (
    <MDXProvider>
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(e) => setValue(e as string)}
          height="90vh"
        />
      </div>
    </MDXProvider>
  );
};

export default EditCourseContent;
