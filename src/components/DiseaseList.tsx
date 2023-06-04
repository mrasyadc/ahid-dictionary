import { List, ListItem, ListIcon } from "@chakra-ui/react";

import { ArrowForwardIcon, ChevronRightIcon, LinkIcon } from "@chakra-ui/icons";

export default function DiseaseList({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <List>
      <ListItem>
        <ListIcon as={ArrowForwardIcon} />
        {children}
      </ListItem>
    </List>
  );
}
