import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Stack, useColorMode } from "@chakra-ui/react";

export default function DarkModeButton(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
