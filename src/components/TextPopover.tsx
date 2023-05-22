import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

interface TextPopoverProps {
  text: string;
}

export default function TextPopover({ text }: TextPopoverProps): JSX.Element {
  return (
    <Popover placement="top-start" trigger="hover" preventOverflow={true}>
      <PopoverTrigger>
        <InfoOutlineIcon color={"blue"} marginLeft={2} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Full text</PopoverHeader>
        <PopoverBody>{text}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
