import { Box, HStack, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

export default function DiseaseList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      p={4}
      borderRadius="md"
      borderWidth={1}
      borderColor="gray.200"
      _hover={{ 
        borderColor: "blue.300", 
        backgroundColor: "blue.50",
        cursor: "pointer" 
      }}
      transition="all 0.2s"
    >
      <HStack gap={3}>
        <ArrowRight size={16} />
        <Text>{children}</Text>
      </HStack>
    </Box>
  );
}
