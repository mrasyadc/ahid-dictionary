import { Flex, Text } from "@chakra-ui/react";
import { LuArrowRight } from 'react-icons/lu';

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
        color: "fg",
        "& > svg": {
          transform: "translateX(6px)",
          color: "currentColor"
        }
      }}
      cursor="pointer"
      py={1}
    >
      <LuArrowRight
        style={{
          transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
          marginRight: "12px"
        }}
      />
      <Text display="inline-block" transition="transform 0.2s">{children}</Text>
    </Flex>
  );
}
