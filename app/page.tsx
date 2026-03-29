"use client";;
import Image from "next/image";
import { useColorMode } from "../src/components/ui/color-mode";
import styles from "./page.module.css";
import useSWR from "swr";
import {
  Steps,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  Container,
  Kbd,
  Link,
  Center,

  List,
  Grid,
  Box,
  HStack,
  Flex,
  Spacer,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useKeyPress } from "../src/hooks/useKeyPress";
import { useEffect, useRef, useState, useMemo } from "react";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import DiseaseList from "@/src/components/DiseaseList";
import LanguageButton from "@/src/components/LanguageButton";
import Header from "@/src/components/Header";
import NextLink from 'next/link';
import { LuExternalLink, LuSearch, LuSun } from 'react-icons/lu';
import { InputGroup } from "@/src/components/ui/input-group";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
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

  const [diseasesKey, setDiseasesKey] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useSWR("/api/diseases/en", fetcher);

  const diseases = useMemo(() => {
    if (isLoading || !data) return [""];
    return Object.keys(data).filter((disease) => {
      return disease.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, isLoading, searchTerm]);

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
        <Button padding={4} asChild><NextLink href="/similaritygraph">Disease Similarity Graph
                  </NextLink></Button>
      </Stack>
      <Header />
      <Flex justify="center" mt={10} w="full" px={4}>
        <InputGroup
          startElement={<LuSearch />}
          endElement={<><Kbd>Alt</Kbd>+<Kbd>K</Kbd></>}
          maxWidth="37.5rem"
          width="100%"
        >
          <Input
            placeholder="Search diseases or keywords"
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Flex justify="center" w="full" mb={20} mt={10} px={4}>
        <Box maxWidth="43.75rem" width="100%">
          <SimpleGrid columns={[1, null, 2]} gap={4}>
          {isLoading && <Spinner />}
          {!isLoading &&
            diseases[0] !== "" &&
            diseases.map((disease) => {
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
        </Box>
      </Flex>
    </>
  );
}
