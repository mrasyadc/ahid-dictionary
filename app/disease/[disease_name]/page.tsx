"use client";

import BackButton from "@/src/components/BackButton";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import DiseaseList from "@/src/components/DiseaseList";
import Header from "@/src/components/Header";
import LanguageButton from "@/src/components/LanguageButton";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Spinner,
  Button,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Disease({
  params,
}: {
  params: { disease_name: string };
}) {
  let { disease_name } = params;
  disease_name = decodeURIComponent(disease_name);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: data_en,
    error: error_en,
    isLoading: isLoading_en,
  } = useSWR("/api/diseases/en", fetcher);
  const {
    data: data_id,
    error: error_id,
    isLoading: isLoading_id,
  } = useSWR("/api/diseases/id", fetcher);
  const [isEnglish, setLanguage] = useState(true);

  return (
    <>
      <Stack direction={"row-reverse"} padding={6}>
        <DarkModeButton />
        <LanguageButton
          isEnglish={isEnglish}
          onClick={() => {
            setLanguage(!isEnglish);
          }}
        />
      </Stack>

      <Header />
      {isEnglish && (
        <Container marginTop={10}>
          <BackButton />
          {isLoading_en && <Spinner />}
          {!isLoading_en && (
            <DataTable isEnglish={isEnglish} disease={data_en[disease_name]} />
          )}
        </Container>
      )}

      {!isEnglish && (
        <Container marginTop={10}>
          <BackButton />
          {isLoading_id && <Spinner />}
          {!isLoading_id && (
            <DataTable isEnglish={isEnglish} disease={data_id[disease_name]} />
          )}
        </Container>
      )}
    </>
  );
}
