import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ITextInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const TextField = ({ name, label, placeholder }: ITextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <FormControl isInvalid={hasError}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Input {...register(name)} placeholder={placeholder} />
      {hasError && <FormErrorMessage>{!errors[name]}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextField;
