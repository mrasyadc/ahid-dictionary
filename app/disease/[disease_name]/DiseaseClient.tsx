"use client";

import { Box,Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";

import BackButton from "@/src/components/BackButton";
import DarkModeButton from "@/src/components/DarkModeButton";
import DataTable from "@/src/components/DataTable";
import Header from "@/src/components/Header";
import LanguageButton from "@/src/components/LanguageButton";

export default function DiseaseClient({
  initialDataEn,
  initialDataId,
}: {
  initialDataEn: any;
  initialDataId: any;
}) {
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
            <DataTable isEnglish={isEnglish} disease={initialDataEn} />
          ) : (
            <DataTable isEnglish={isEnglish} disease={initialDataId} />
          )}
        </Box>
      </Flex>
    </>
  );
}
