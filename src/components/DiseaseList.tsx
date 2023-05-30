import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import { ArrowForwardIcon, ChevronRightIcon, LinkIcon } from "@chakra-ui/icons";

export default function DiseaseList({ children }): JSX.Element {
  return (
    <List>
      <ListItem>
        <ListIcon as={ArrowForwardIcon} />
        {children}
      </ListItem>
    </List>
  );
}
