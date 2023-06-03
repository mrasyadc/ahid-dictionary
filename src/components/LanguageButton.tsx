import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Stack, useColorMode } from "@chakra-ui/react";

export default function LanguageButton({
  isEnglish,
  onClick,
}: {
  isEnglish: boolean;
}): JSX.Element {
  return <Button onClick={onClick}>{isEnglish ? "EN" : "ID"}</Button>;
}
