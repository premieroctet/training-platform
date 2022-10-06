import { Box, Input, Textarea } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";

const FieldArray = () => {
  const { control, register } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "chaptersInfo",
  });

  return (
    <>
      {fields.map((_, index) => (
        <>
          <Input
            placeholder="Chapitre"
            size="md"
            {...register(`chaptersInfo.${index}.title`)}
          />
          <Box pl={6}>
            <Textarea
              fontSize="sm"
              placeholder="Description du chapitre"
              {...register(`chaptersInfo.${index}.description`)}
            />
          </Box>
        </>
      ))}
    </>
  );
};

export default FieldArray;
