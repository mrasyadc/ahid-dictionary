"use client";

import BackButton from "@/src/components/BackButton";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import DiseaseList from "@/src/components/DiseaseList";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Disease({ params }: { params: { id: number } }) {
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
        <BackButton />
        <DataTable />
      </Container>
    </>
  );
}
