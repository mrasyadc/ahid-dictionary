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
  Spinner,
} from "@chakra-ui/react";
import { ExternalLinkIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import { useKeyPress } from "../src/hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import DiseaseList from "@/src/components/DiseaseList";
import LanguageButton from "@/src/components/LanguageButton";
import Header from "@/src/components/Header";

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

  const { data, error, isLoading } = useSWR("/api/diseases/en", fetcher);

  useEffect(() => {
    setDiseases(data);
  }, [data]);

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
      </Stack>
      <Header />
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
          {isLoading && <Spinner />}
          {diseases &&
            Object.keys(diseases).map((disease, key) => {
              return (
                <Link
                  key={disease}
                  href={`/disease/${encodeURIComponent(disease)}`}
                >
                  <DiseaseList key={disease}>{disease}</DiseaseList>
                </Link>
              );
            })}
        </SimpleGrid>
      </Container>
    </>
  );
}
