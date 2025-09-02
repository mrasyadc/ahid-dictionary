import { Moon, Sun } from "lucide-react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function DarkModeButton() {
  const [isDark, setIsDark] = useState(false);

  const toggleColorMode = () => {
    setIsDark(!isDark);
    // In Chakra UI v3, color mode is handled differently
    // For now, we'll use a simple state toggle
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button onClick={toggleColorMode}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
