import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import type { TinaTemplate } from "tinacms";

export const CheckListSchema: TinaTemplate = {
  label: "Check List",
  name: "CheckList",
  fields: [
    {
      label: "Texte du nouvel item (items séparés par | )",
      name: "items",
      type: "string",
    },
  ],
};

export const CheckList = ({ items }: { items: string }) => {
  const splittedItems = items.split(" | ");

  return (
    <List spacing={3}>
      {splittedItems.map((item, idx) => (
        <ListItem key={idx}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {item}
        </ListItem>
      ))}
    </List>
  );
};
