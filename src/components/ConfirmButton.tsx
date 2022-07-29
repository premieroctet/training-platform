import {
  Button,
  ButtonProps,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

import { ReactElement } from "react";

interface IConfirmButtonProps extends ButtonProps {
  label: string;
  icon?: ReactElement;
  onConfirm: () => void;
  confirmDetail: string;
}

const ConfirmButton = ({
  label,
  icon,
  confirmDetail,
  onConfirm,
  ...rest
}: IConfirmButtonProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          {icon ? (
            <IconButton icon={icon} aria-label={label} {...rest} />
          ) : (
            <Button {...rest}>{label}</Button>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader textAlign="center">{confirmDetail}</PopoverHeader>
          <PopoverBody textAlign="center">
            <Button colorScheme="red" size="sm" onClick={onConfirm}>
              Confirmer
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ConfirmButton;
