import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ITextInputProps {
  name: string;
  label: string;
}

const SwitchField = ({ name, label }: ITextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <FormControl display="flex" alignItems="center" isInvalid={hasError}>
      <FormLabel mb="0" fontSize="sm">
        {label}
      </FormLabel>
      <Switch {...register(name)} colorScheme="primary" />
      {hasError && <FormErrorMessage>{!errors[name]}</FormErrorMessage>}
    </FormControl>
  );
};

export default SwitchField;
