import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Stack, useColorMode } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export default function LanguageButton({
  isEnglish,
  onClick,
}: {
  isEnglish: boolean;
  onClick: MouseEventHandler;
}): JSX.Element {
  return <Button onClick={onClick}>{isEnglish ? "EN" : "ID"}</Button>;
}
