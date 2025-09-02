"use client";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import DarkModeButton from "@/components/DarkModeButton";
import DataTable from "@/components/DataTable";
import DiseaseList from "@/components/DiseaseList";
import Header from "@/components/Header";
import LanguageButton from "@/components/LanguageButton";
import { ExternalLink } from "lucide-react";
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

import useSWR from "swr";
// import { Metadata, ResolvingMetadata } from "next";

// type Props = {
//   params: { disease_name: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const disease_name = params.disease_name;

//   console.log(disease_name);

//   return {
//     title: `${disease_name} - Atlas of Human Infectious Disease`,
//   };
// }

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
