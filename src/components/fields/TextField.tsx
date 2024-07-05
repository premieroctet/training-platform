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
  disabled?: boolean;
}

const TextField = ({ name, label, placeholder, disabled }: ITextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <FormControl isInvalid={hasError}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Input
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {hasError && (
        <FormErrorMessage>
          {/* @ts-expect-error */}
          <p>{errors[name]?.message}</p>
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default TextField;
