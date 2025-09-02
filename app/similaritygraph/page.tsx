"use client";
import { useEffect, useRef, useState, useMemo } from "react";
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
import { Search } from "lucide-react";
import DarkModeButton from "@/components/DarkModeButton";
import SimilarityPageHeader from "@/components/HeaderSimilarityPage";
import NetworkGraph from "@/components/SimilarityGraph";
import SimilarityTable from "@/components/SimilarityTable";
import data from "@/json/similardata.json";
import { useKeyPress } from "@/hooks/useKeyPress";
import NextLink from 'next/link';

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
        <NextLink href="/" passHref>
          <Button as={Link} padding={4}>
            Homepage
          </Button>
      </NextLink>
      </Stack>
      <SimilarityPageHeader />
      <Container marginTop={10}>
        <Box position="relative">
          <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" zIndex="2">
            <Search size={16} />
          </Box>
          <Input
            placeholder="Search diseases or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
            paddingLeft="10"
            ref={inputRef} // Attach ref to the input field
          />
          <Box position="absolute" right="3" top="50%" transform="translateY(-50%)" zIndex="2">
            <Text fontSize="sm" color="gray.500">Alt+K</Text>
          </Box>
        </Box>
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
