"use client";;
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Kbd,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from 'next/link';
import { useEffect, useMemo,useRef, useState } from "react";
import { LuSearch } from 'react-icons/lu';

import DarkModeButton from "@/components/DarkModeButton";
import SimilarityPageHeader from "@/components/HeaderSimilarityPage";
import NetworkGraph from "@/components/SimilarityGraph";
import SimilarityTable from "@/components/SimilarityTable";
import { InputGroup } from "@/components/ui/input-group";
import { SIMILARITY_COLOR } from "@/constants";
import { useModifierKey } from "@/hooks/useModifierKey";
import data from "@/json/similardata.json";
import { matchesRow,parseSearch } from "@/utils/parseSearch";

const EXAMPLES = ["Rubella", "Dengue, Malaria", "Rubella vs Dengue"];

const SimilarDisease: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const modifierKey = useModifierKey();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey) && e.key === 'k') {
        e.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const query = useMemo(() => parseSearch(searchTerm), [searchTerm]);

  const filteredData = useMemo(() =>
    data
      .filter((item) => matchesRow(item.disease1, item.disease2, query))
      .toSorted((a, b) => b.similarity - a.similarity)
      .slice(0, 20),
    [query]
  );

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
        <Button padding={4} asChild><NextLink href="/">Homepage</NextLink></Button>
      </Stack>
      <SimilarityPageHeader />
      <Flex justify="center" mt={10} w="full" px={4} direction="column" align="center" gap={3}>
        <InputGroup
          startElement={<LuSearch />}
          endElement={<><Kbd>{modifierKey}</Kbd>+<Kbd>K</Kbd></>}
          maxWidth="37.5rem"
          width="100%"
        >
          <Input
            placeholder='Try "Dengue" · "Rubella, Dengue" · "Rubella vs Dengue"'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
          />
        </InputGroup>
        <HStack gap={2} flexWrap="wrap" justify="center">
          <Text fontSize="xs" color="fg.muted">Examples:</Text>
          {EXAMPLES.map((ex) => (
            <Box
              key={ex}
              as="button"
              onClick={() => setSearchTerm(ex)}
              px={2.5} py={0.5}
              borderRadius="full"
              border="1px solid"
              borderColor="border.muted"
              fontSize="xs"
              color="fg.muted"
              cursor="pointer"
              transition="all 0.15s"
              _hover={{ borderColor: SIMILARITY_COLOR, color: SIMILARITY_COLOR }}
              _focusVisible={{ outline: "none" }}
            >
              {ex}
            </Box>
          ))}
        </HStack>
      </Flex>
      <Flex direction="column" align="center" w="full" mb={20} mt={10} px={4}>
        {filteredData.length > 0 ? (
          <NetworkGraph data={filteredData} />
        ) : (
          <Text>No data available</Text>
        )}
        <Box maxWidth="100ch" width="100%" mt={10}>
          {filteredData.length > 0 ? (
            <SimilarityTable data={filteredData} query={query} />
          ) : null}
        </Box>
      </Flex>
    </>
  );
};

export default SimilarDisease;
