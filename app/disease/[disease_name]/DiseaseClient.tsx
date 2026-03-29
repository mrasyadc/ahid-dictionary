"use client";

import { Box,Flex, Spinner, Stack } from "@chakra-ui/react";
import { use,useState } from "react";
import useSWR from "swr";

import BackButton from "@/src/components/BackButton";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import Header from "@/src/components/Header";
import LanguageButton from "@/src/components/LanguageButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DiseaseClient({
  params,
}: {
  params: Promise<{ disease_name: string }>;
}) {
  let { disease_name } = use(params);
  disease_name = decodeURIComponent(disease_name);

  const {
    data: data_en,
    isLoading: isLoading_en,
  } = useSWR("/api/diseases/en", fetcher);
  
  const {
    data: data_id,
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
      <Flex direction="column" align="center" w="full" mb={20} mt={10} px={4}>
        <Box maxWidth="100ch" width="100%">
          <BackButton />
          {isEnglish ? (
            <>
              {isLoading_en && <Spinner />}
              {!isLoading_en && data_en && (
                <DataTable isEnglish={isEnglish} disease={data_en[disease_name]} />
              )}
            </>
          ) : (
            <>
              {isLoading_id && <Spinner />}
              {!isLoading_id && data_id && (
                <DataTable isEnglish={isEnglish} disease={data_id[disease_name]} />
              )}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
