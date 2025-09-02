import { Info } from "lucide-react";
import { Box } from "@chakra-ui/react";

interface TextPopoverProps {
  attr: string;
  text: string;
}

export default function TextPopover({
  text,
  attr,
}: TextPopoverProps) {
  return (
    <Box 
      display="inline-block" 
      ml={2}
      title={`${attr} full text: ${text}`}
      style={{ cursor: 'pointer' }}
    >
      <Info color="blue" size={16} />
    </Box>
  );
}
