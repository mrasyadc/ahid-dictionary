"use client";

import Image from "next/image";
import styles from "./page.module.css";
import useSWR from "swr";
import {
  Heading,
  Text,
  Button,
  Stack,
  Input,
  Container,
  Link,
  Box,
  HStack,
  Flex,
  Spacer,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Search, ExternalLink, Sun, Keyboard } from "lucide-react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import DarkModeButton from "@/components/DarkModeButton";
import DataTable from "@/components/DataTable";
import DiseaseList from "@/components/DiseaseList";
import LanguageButton from "@/components/LanguageButton";
import Header from "@/components/Header";
import NextLink from 'next/link';

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

  const [diseases, setDiseases] = useState([""]);
  const [diseasesKey, setDiseasesKey] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useSWR("/api/diseases/en", fetcher);

  useEffect(() => {
    if (!isLoading) {
      setDiseases(Object.keys(data));
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const results = Object.keys(data).filter((disease) => {
        return disease.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setDiseases(results);
    }
  }, [searchTerm, isLoading, data]);

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
        <NextLink href="/similaritygraph" passHref>
          <Button as={Link} padding={4}>
            Disease Similarity Graph
          </Button>
      </NextLink>
      </Stack>
      <Header />
      <Container marginTop={10}>
        <Box position="relative">
          <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" zIndex="2">
            <Search size={16} />
          </Box>
          <Input
            placeholder="Search diseases or keywords"
            paddingLeft="10"
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box position="absolute" right="3" top="50%" transform="translateY(-50%)" zIndex="2">
            <Text fontSize="sm" color="gray.500">Alt+K</Text>
          </Box>
        </Box>
      </Container>

      <Container maxWidth={"100ch"} centerContent={true} marginBottom={20}>
        <SimpleGrid columns={[1, null, 2]} gap={4} marginTop={10}>
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
      </Container>
    </>
  );
}
