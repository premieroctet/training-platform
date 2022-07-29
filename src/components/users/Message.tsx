import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  useBoolean,
} from "@chakra-ui/react";

type Props = {
  message: MessageData | null;
};

export type MessageData = {
  type: "success" | "warning" | "error";
  message: string;
};

const Message = ({ message }: Props) => {
  const [showAlert, setShowAlert] = useBoolean(!!message);

  return showAlert && message ? (
    <Alert
      my="2"
      status={message?.type}
      variant="left-accent"
      colorScheme={message?.type === "success" ? "green" : "red"}
    >
      <AlertIcon />
      <AlertTitle mr={2}>{message.message}</AlertTitle>
      <CloseButton
        onClick={() => {
          setShowAlert.toggle();
        }}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  ) : null;
};

export default Message;
