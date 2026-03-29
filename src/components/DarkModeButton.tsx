import { useColorMode } from "./ui/color-mode";
import { Button, ClientOnly, Skeleton } from "@chakra-ui/react";
import { LuMoon, LuSun } from 'react-icons/lu';

export default function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Skeleton width="10" height="10" />}>
      <Button onClick={toggleColorMode}>
        {colorMode == "light" ? <LuMoon /> : <LuSun />}
      </Button>
    </ClientOnly>
  );
}
