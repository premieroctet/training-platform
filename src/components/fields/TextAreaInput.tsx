import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ITextInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const TextAreaField = ({ name, label, placeholder }: ITextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <FormControl isInvalid={hasError}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Textarea {...register(name)} placeholder={placeholder} />
      {hasError && <FormErrorMessage>{!errors[name]}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextAreaField;
