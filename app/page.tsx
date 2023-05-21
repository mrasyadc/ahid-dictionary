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
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Flex,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Kbd,
} from "@chakra-ui/react";
import { Search2Icon, SunIcon } from "@chakra-ui/icons";
import { useKeyPress } from "../hooks/useKeyPress";
import { useEffect, useRef } from "react";

export default function Home() {
  const { toggleColorMode } = useColorMode();
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
      <Stack direction={"row-reverse"} padding={6}>
        <Button onClick={toggleColorMode}>
          <SunIcon />
        </Button>
      </Stack>
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Atlas of Human Infectious Disease
      </Heading>
      <Heading fontSize={"48px"} fontWeight={700} as="h1" textAlign={"center"}>
        Dictionary
      </Heading>
      <Text textAlign={"center"}>
        App and Design by Muhammad Rasyad Caesarardhi
      </Text>
      <Text textAlign={"center"}>
        Data processed and summarized using algorithm from BRIO paper
      </Text>
      <Text textAlign={"center"}>
        Data provided by Atlas of Human Infectious Diseases
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
        <TableContainer marginTop={10}>
          <Table variant="simple">
            <TableCaption>
              Atlas of Human Infectious Diseases Quick Summary
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Subjects</Th>
                <Th>Quick Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Disease</Td>
                <Td>Botulism</Td>
              </Tr>
              <Tr>
                <Td>Classification</Td>
                <Td>ICD-9 005.1; ICD-10 A05.1</Td>
              </Tr>
              <Tr>
                <Td>Syndromes and synonyms</Td>
                <Td>
                  Botulinum toxin, produced by the anerobic sporeforming
                  bacterium Clostridium botulinum types A, B, E and rarely F.
                </Td>
              </Tr>
              <Tr>
                <Td>Reservoir</Td>
                <Td overflowX={"hidden"}>
                  C. botulinum spores are found in soil, dust, honey, marine
                  sediments, and in intestines of fish and land animals.
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Subjects</Th>
                <Th>Quick Description</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
