import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

interface TextPopoverProps {
  attr: string;
  text: string;
}

export default function TextPopover({
  text,
  attr,
}: TextPopoverProps): JSX.Element {
  return (
    <Popover placement="top-start" trigger="hover" preventOverflow={true}>
      <PopoverTrigger>
        <InfoOutlineIcon color={"blue"} marginLeft={2} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{attr} full text</PopoverHeader>
        <PopoverBody>{text}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
