"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {
  Heading,
  Text,
  Button,
  useColorMode,
  Stack,
  Input,
  Container,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Kbd,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import { useKeyPress } from "../src/hooks/useKeyPress";
import { useEffect, useRef } from "react";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";

export default function Home(): JSX.Element {
  const altPressed = useKeyPress("Alt");
  const kPressed = useKeyPress("k");

  const inputRef = useRef<HTMLInputElement>(null);

  const setFocus = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (altPressed && kPressed) {
      setFocus();
    }
  }, [kPressed, altPressed]);

  return (
    <>
      <DarkModeButton />
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Atlas of Human Infectious Disease
      </Heading>
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Dictionary
      </Heading>
      <Text textAlign={"center"}>
        App and Design by{" "}
        <Link href="https://www.showwcase.com/mrasyadc" isExternal>
          Muhammad Rasyad Caesarardhi <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Data processed and summarized using{" "}
        <Link href="https://aclanthology.org/2022.acl-long.207/" isExternal>
          Bringing Order to Abstractive Summarization paper{" "}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text textAlign={"center"}>
        Data provided by{" "}
        <Link
          href="https://onlinelibrary.wiley.com/doi/book/10.1002/9781444354690"
          isExternal
        >
          Atlas of Human Infectious Diseases <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Container marginTop={10}>
        <InputGroup>
          <InputLeftElement>
            <Search2Icon />
          </InputLeftElement>
          <Input placeholder="Search diseases or keywords" ref={inputRef} />
          <InputRightElement marginRight={5}>
            <Kbd>Alt</Kbd>+<Kbd>K</Kbd>
          </InputRightElement>
        </InputGroup>
        <DataTable />
      </Container>
    </>
  );
}
