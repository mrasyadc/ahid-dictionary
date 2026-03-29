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
      <Container marginTop={10}>
        <InputGroup
          startElement={<LuSearch />}
          endElement={<><Kbd>Alt</Kbd>+<Kbd>K</Kbd></>}
        >
          <Input
            placeholder="Search diseases or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
            ref={inputRef} // Attach ref to the input field
          />
        </InputGroup>
      </Container>
      <Container centerContent>
        {filteredData.length > 0 ? (
          <NetworkGraph data={filteredData} />
        ) : (
          <Text>No data available</Text>
        )}
      </Container>
      <Container>
        {filteredData.length > 0 ? (
          <SimilarityTable data={filteredData} searchTerm={searchTerm} />
        ) : null}
      </Container>
      <Container maxWidth={"100ch"} centerContent={true} marginBottom={20}>
      </Container>
    </>
  );
};

export default SimilarDisease;
