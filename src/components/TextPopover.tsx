import { Box, Heading,HoverCard, Icon, Text } from "@chakra-ui/react";
import { LuInfo } from 'react-icons/lu';

interface TextPopoverProps {
  attr: string;
  text: string;
}

export default function TextPopover({
  text,
  attr,
}: TextPopoverProps) {
  return (
    <HoverCard.Root
      positioning={{
        placement: 'top-start'
      }} openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <Box as="span" display="inline-block" cursor="pointer">
          <Icon color={"blue.500"} marginLeft={2} asChild><LuInfo /></Icon>
        </Box>
      </HoverCard.Trigger>
      <HoverCard.Positioner zIndex="popover">
        <HoverCard.Content maxWidth="22rem" padding={4} boxShadow="xl" borderRadius="lg" bg="white" _dark={{ bg: "gray.800" }}>
          <HoverCard.Arrow />
          <Box>
            <Heading size="sm" marginBottom={2}>{attr}</Heading>
            <Text fontSize="sm" lineHeight="tall">{text}</Text>
          </Box>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  );
}
