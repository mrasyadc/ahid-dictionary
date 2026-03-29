import { Flex, Text } from "@chakra-ui/react";
import { LuArrowRight } from 'react-icons/lu';

import { SIMILARITY_COLOR } from "@/constants";

export default function DiseaseList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      align="center"
      color="fg.muted"
      transition="all 0.2s"
      _hover={{
        color: SIMILARITY_COLOR,
        textDecoration: 'underline',
        textDecorationColor: SIMILARITY_COLOR,
        "& > svg": {
          transform: "translateX(0.375rem)",
          color: "currentColor"
        }
      }}
      _focus={{ outline: "none" }}
      cursor="pointer"
      py={1}
    >
      <LuArrowRight
        style={{
          transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
          marginRight: "0.75rem"
        }}
      />
      <Text display="inline-block" transition="transform 0.2s">{children}</Text>
    </Flex>
  );
}
