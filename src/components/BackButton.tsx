import { Button, HStack } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <HStack padding={6}>
      <Button onClick={() => router.push("/")}>
        <ArrowLeft size={16} />
      </Button>
    </HStack>
  );
}
