import { ArrowBackIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BackButton(): JSX.Element {
  const router = useRouter();

  return (
    <Stack direction={"row"} padding={6}>
      <Button onClick={() => router.push("/")}>
        <ArrowBackIcon />
      </Button>
    </Stack>
  );
}
