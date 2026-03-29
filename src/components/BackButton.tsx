import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from 'react-icons/lu';

export default function BackButton() {
  const router = useRouter();

  return (
    <Stack direction={"row"} padding={6}>
      <Button onClick={() => router.push("/")}>
        <LuArrowLeft />
      </Button>
    </Stack>
  );
}
