"use client";;
import Image from "next/image";
import { useColorMode } from "../src/components/ui/color-mode";

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
import { useModifierKey } from "@/src/hooks/useModifierKey";
import { parseSearch, matchesSingle } from "@/src/utils/parseSearch";
import { SIMILARITY_COLOR } from "@/src/constants";

const EXAMPLES = ["Dengue", "Malaria, Rabies", "Hepatitis"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const modifierKey = useModifierKey();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey) && e.key === 'k') {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [diseasesKey, setDiseasesKey] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useSWR("/api/diseases/en", fetcher);

  const query = useMemo(() => parseSearch(searchTerm), [searchTerm, data, isLoading]);

  const diseases = useMemo(() => {
    if (isLoading || !data) return [""];
    return Object.keys(data).filter((disease) => matchesSingle(disease, query));
  }, [data, isLoading, query]);

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
        <Button padding={4} asChild><NextLink href="/similaritygraph">Disease Similarity Graph
                  </NextLink></Button>
      </Stack>
      <Header />
      <Flex justify="center" mt={10} w="full" px={4} direction="column" align="center" gap={3}>
        <InputGroup
          startElement={<LuSearch />}
          endElement={<><Kbd>{modifierKey}</Kbd>+<Kbd>K</Kbd></>}
          maxWidth="37.5rem"
          width="100%"
        >
          <Input
            placeholder='Try "Dengue" · "Malaria, Rabies" · "Hepatitis"'
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <HStack gap={2} flexWrap="wrap" justify="center">
          <Text fontSize="xs" color="fg.muted">Examples:</Text>
          {EXAMPLES.map((ex) => (
            <Box
              key={ex}
              as="button"
              onClick={() => {
                setSearchTerm(ex);
                // also sync the input value visually
                if (inputRef.current) inputRef.current.value = ex;
              }}
              px={2.5}
              py={0.5}
              borderRadius="full"
              border="1px solid"
              borderColor="border.muted"
              fontSize="xs"
              color="fg.muted"
              cursor="pointer"
              transition="all 0.15s"
              _hover={{ borderColor: SIMILARITY_COLOR, color: SIMILARITY_COLOR }}
              _focusVisible={{ outline: 'none' }}
            >
              {ex}
            </Box>
          ))}
        </HStack>
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
                  _focus={{ outline: "none" }}
                  _focusVisible={{ outline: "none" }}
                  _hover={{ color: SIMILARITY_COLOR, textDecoration: 'none' }}
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
