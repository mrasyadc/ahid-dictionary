"use client";;
import { useEffect, useRef, useState, useMemo } from "react";
import { useColorMode } from "../../src/components/ui/color-mode";
import Image from "next/image";
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
import DarkModeButton from "@/src/components/DarkModeButton";
import SimilarityPageHeader from "@/src/components/HeaderSimilarityPage";
import NetworkGraph from "@/src/components/SimilarityGraph";
import SimilarityTable from "@/src/components/SimilarityTable";
import data from "@/json/similardata.json";
import { useKeyPress } from "@/src/hooks/useKeyPress";
import NextLink from 'next/link';
import { LuSearch } from 'react-icons/lu';
import { InputGroup } from "@/src/components/ui/input-group";

const SimilarDisease: React.FC = () => {
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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return data
      .filter(
        (item) =>
          item.disease1.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.disease2.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20);
  }, [searchTerm]);

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
        <Button padding={4} asChild><NextLink href="/">Homepage
                  </NextLink></Button>
      </Stack>
      <SimilarityPageHeader />
      <Flex justify="center" mt={10} w="full" px={4}>
        <InputGroup
          startElement={<LuSearch />}
          endElement={<><Kbd>Alt</Kbd>+<Kbd>K</Kbd></>}
          maxWidth="600px"
          width="100%"
        >
          <Input
            placeholder="Search diseases or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef} // Attach ref to the input field
          />
        </InputGroup>
      </Flex>
      <Flex direction="column" align="center" w="full" mb={20} mt={10} px={4}>
        {filteredData.length > 0 ? (
          <NetworkGraph data={filteredData} />
        ) : (
          <Text>No data available</Text>
        )}
        <Box maxWidth="100ch" width="100%" mt={10}>
          {filteredData.length > 0 ? (
            <SimilarityTable data={filteredData} searchTerm={searchTerm} />
          ) : null}
        </Box>
      </Flex>
    </>
  );
};

export default SimilarDisease;
