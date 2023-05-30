"use client";

import Image from "next/image";
import styles from "./page.module.css";
import useSWR from "swr";
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
  Center,
  Divider,
  List,
  Grid,
  Box,
  HStack,
  Flex,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import { ExternalLinkIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import { useKeyPress } from "../src/hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import DiseaseList from "@/src/components/DiseaseList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  const [diseases, setDiseases] = useState();
  const [diseasesKey, setDiseasesKey] = useState();

  const { data, error, isLoading } = useSWR("/api/diseases", fetcher);

  useEffect(() => {
    setDiseases(data);
  }, [data]);

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
      </Container>

      <Container maxWidth={"100ch"} centerContent={true} marginBottom={20}>
        <SimpleGrid columns={[1, null, 2]} spacing={4} marginTop={10}>
          {/* {diseases.map((disease) => { */}
          {/* return <DiseaseList key={disease}>{disease}</DiseaseList>; */}
          {/* })} */}
          {/* {diseases["Anthrax"]} */}
          {isLoading && "Loading"}
          {diseases &&
            Object.keys(diseases).map((disease, key) => {
              return (
                <Link key={disease} href={"/disease/" + key}>
                  <DiseaseList key={disease}>{disease}</DiseaseList>
                </Link>
              );
            })}
        </SimpleGrid>
      </Container>
    </>
  );
}
