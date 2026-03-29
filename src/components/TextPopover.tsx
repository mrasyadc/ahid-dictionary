import { Steps, Popover, HoverCard, Icon } from "@chakra-ui/react";
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
    <Popover.Root
      positioning={{
        placement: 'top-start'
      }}>
      <Popover.Trigger asChild>
        <Icon color={"blue"} marginLeft={2} asChild><LuInfo /></Icon>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Title>{attr} full text</Popover.Title>
          <Popover.Body>{text}</Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
