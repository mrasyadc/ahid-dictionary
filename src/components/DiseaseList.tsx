import { Steps, List } from "@chakra-ui/react";

import { LuArrowRight, LuChevronRight, LuLink } from 'react-icons/lu';

export default function DiseaseList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <List.Root>
      <List.Item>
        <List.Indicator asChild><LuArrowRight /></List.Indicator>
        {children}
      </List.Item>
    </List.Root>
  );
}
