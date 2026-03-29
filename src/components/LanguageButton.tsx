import { useColorMode } from "./ui/color-mode";
import { Steps, Button, Stack } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { LuMoon, LuSun } from 'react-icons/lu';

export default function LanguageButton({
  isEnglish,
  onClick,
}: {
  isEnglish: boolean;
  onClick: MouseEventHandler;
}) {
  return <Button onClick={onClick}>{isEnglish ? "EN" : "ID"}</Button>;
}
