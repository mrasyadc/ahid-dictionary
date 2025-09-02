import { Box, Text } from "@chakra-ui/react";
import TextPopover from "./TextPopover";

export default function DataTable({ disease, isEnglish }: any) {
  const attributes = Object.keys(disease["original_text"]);
  return (
    <Box marginTop={6}>
      <Box 
        as="table" 
        width="100%" 
        borderCollapse="collapse"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Box as="caption" padding={4} fontWeight="bold" textAlign="left">
          Atlas of Human Infectious Diseases Quick Summary
        </Box>
        <Box as="thead" backgroundColor="gray.50">
          <Box as="tr">
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderBottomWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              {isEnglish ? "Subjects" : "Subjek"}
            </Box>
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderBottomWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              {isEnglish ? "Quick Description (AI)" : "Penjelasan Singkat (AI)"}
            </Box>
          </Box>
        </Box>
        <Box as="tbody">
          {attributes.map((attr) => {
            return (
              <Box as="tr" key={attr} _hover={{ backgroundColor: "gray.50" }}>
                <Box 
                  as="td" 
                  padding={4} 
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  width="21ch"
                  verticalAlign="top"
                >
                  {attr}
                  <TextPopover
                    attr={attr}
                    text={disease?.["original_text"][attr]}
                  />
                </Box>
                <Box 
                  as="td" 
                  padding={4} 
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  verticalAlign="top"
                >
                  <Text _firstLetter={{ textTransform: "capitalize" }}>
                    {disease?.["summarize_text"][attr] == "NaN"
                      ? "-"
                      : disease?.["summarize_text"][attr]}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box as="tfoot" backgroundColor="gray.50">
          <Box as="tr">
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderTopWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              Subjects
            </Box>
            <Box 
              as="th" 
              padding={4} 
              textAlign="left" 
              borderTopWidth="1px"
              borderColor="gray.200"
              fontWeight="semibold"
            >
              Quick Description
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
