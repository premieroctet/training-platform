import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ITextInputProps {
  name: string;
  label: string;
  disabled?: boolean;
}

const CheckboxField = ({ name, label, disabled }: ITextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  return (
    <FormControl isInvalid={hasError}>
      <Checkbox
        colorScheme="primary"
        {...register(name + ".value")}
        disabled={disabled}
      >
        <Text fontSize="sm"> {label}</Text>
      </Checkbox>
      {hasError && <FormErrorMessage>{!errors[name]}</FormErrorMessage>}
    </FormControl>
  );
};

export default CheckboxField;
