import { Steps, Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuMoon, LuSun } from 'react-icons/lu';

export default function BackButton() {
  const router = useRouter();

  return (
    <HStack padding={6}>
      <Button onClick={() => router.push("/")}>
        <LuArrowLeft />
      </Button>
    </HStack>
  );
}
