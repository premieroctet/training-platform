import { useFieldArray, useFormContext } from "react-hook-form";
import CheckboxField from "./CheckBoxField";

interface IProps {
  arrayName: string;
  labelFieldName: string;
}

const CheckBoxFieldArray = ({ arrayName, labelFieldName }: IProps) => {
  const { control, watch } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: arrayName,
  });
  const watchFieldArray = watch(arrayName);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  return (
    <>
      {controlledFields.map((field, index) => (
        <CheckboxField
          key={field?.id}
          name={`${arrayName}.${index}`}
          label={field[labelFieldName]}
        />
      ))}
    </>
  );
};

export default CheckBoxFieldArray;
