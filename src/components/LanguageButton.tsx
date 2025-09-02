import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export default function LanguageButton({
  isEnglish,
  onClick,
}: {
  isEnglish: boolean;
  onClick: MouseEventHandler;
}) {
  return <Button onClick={onClick}>{isEnglish ? "EN" : "ID"}</Button>;
}
