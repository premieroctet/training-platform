import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ITextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const SelectField = ({
  name,
  label,
  placeholder,
  options,
  disabled,
}: ITextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <FormControl isInvalid={hasError}>
      <FormLabel fontSize="sm">{label}</FormLabel>

      <Select placeholder={placeholder} {...register(name)} disabled={disabled}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {hasError && <FormErrorMessage>{!errors[name]}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectField;
