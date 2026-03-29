"use client";;

import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Kbd,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from 'next/link';
import { useEffect, useMemo,useRef, useState } from "react";
import { LuSearch } from 'react-icons/lu';
import useSWR from "swr";

import DarkModeButton from "@/src/components/DarkModeButton";
import DiseaseList from "@/src/components/DiseaseList";
import Header from "@/src/components/Header";
import { InputGroup } from "@/src/components/ui/input-group";
import { SIMILARITY_COLOR } from "@/src/constants";
import { useModifierKey } from "@/src/hooks/useModifierKey";
import { matchesSingle,parseSearch } from "@/src/utils/parseSearch";

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

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useSWR("/api/diseases/en", fetcher);

  const query = useMemo(() => parseSearch(searchTerm), [searchTerm]);

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
