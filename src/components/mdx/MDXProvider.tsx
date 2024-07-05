import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/layout";
import { Code, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { MDXProvider as MDXDefaultProvider } from "@mdx-js/react";
import React from "react";
import ChapterHeading from "./ChapterHeading";
import SlideHeader from "./SlideHeader";
import CodeBlock from "./CodeBlock";
import Slides from "./Slides";

type ChildrenProp = {
  children: React.ReactElement | React.ReactElement[];
  courseMap?: Boolean;
};

export const mdComponents = {
  // huge headings
  h1: (props: any) => <Heading fontSize="2.4em" {...props} />,
  h2: (props: any) => <Heading fontSize="2em" {...props} />,
  // Headings
  h3: (props: any) => <Heading fontSize="1.8em" m="0.4em 0" {...props} />,
  h4: (props: any) => <Heading fontSize="1.4em" m="0.4em 0" {...props} />,
  // Basic heading
  h5: (props: any) => <Text fontSize="1.2em" m="0.2em 0" {...props} />,
  // Centered heading
  h6: (props: any) => <Text fontSize="1.2em" m="0.2em 0" {...props} />,
  // Lists
  List: (props: any) => <List paddingLeft="1.6em" m="sm" {...props} />,
  ListItem: (props: any) => <ListItem m="0.2em" {...props} />,
  ListIcon: (props: any) => <ListIcon fontSize="1.1em" {...props} />,
  ul: (props: any) => (
    <List
      paddingLeft="1.6em"
      marginTop="xs"
      marginBottom="sm"
      listStyleType="revert"
      {...props}
    />
  ),
  li: (props: any) => <ListItem m="0.2em" {...props} />,
  // Text
  p: (props: any) => <Text {...props} />,
  // links
  a: (props: any) => <a target="_blank" {...props}></a>,
  // tables
  table: (props: any) => <Table {...props} />,
  tbody: (props: any) => <Tbody fontSize="0.6em" {...props} />,
  th: (props: any) => <Th p="sm" bgColor="yellow.300" {...props} />,
  tr: (props: any) => <Tr {...props} />,
  td: (props: any) => <Td {...props} lineHeight={"1.7em"} />,
  // Code
  code: (props: any) => <CodeBlock {...props} />,
  inlineCode: (props: any) => (
    <Code
      fontSize="0.75em"
      m="0.1em"
      fontFamily="SFMono-Regular,Menlo,Monaco,Consolas,monospace"
      colorScheme="gray"
      letterSpacing="0.05em"
      {...props}
    />
  ),
  // ChakraUI
  Box,
  Flex,
  HStack: (props: any) => <HStack justifyContent="space-between" {...props} />,
  VStack,
  Icon,
  // Images
  Image: (props: any) => (
    <Image
      objectFit="contain"
      maxHeight="90%"
      maxWidth="100%"
      flex="0 auto"
      m="md"
      alt="image mdx"
      {...props}
    />
  ),
  // Custom components
  ChapterHeading,
  SlideHeader,
  // slides wrapper
  Slides,
  Notes: (props: any) => (
    <Text width="100%" height="100%" p="1em" fontSize="1.4em" {...props} />
  ),
};

export const courseMapComponents = {
  h1: (props: any) => <Heading fontSize="2.4em" marginBottom="md" {...props} />,
  h2: (props: any) => <Heading fontSize="2em" marginY="sm" {...props} />,
  h3: (props: any) => <Heading fontSize="1.8em" marginBottom="sm" {...props} />,
  ul: (props: any) => (
    <List
      paddingLeft="md"
      marginBottom="xs"
      listStyleType="revert"
      {...props}
    />
  ),
};

const MDXProvider = ({ children, courseMap }: ChildrenProp) => (
  // @ts-ignore
  <MDXDefaultProvider
    components={{ ...mdComponents, ...(courseMap && courseMapComponents) }}
  >
    {children}
  </MDXDefaultProvider>
);

export default MDXProvider;
