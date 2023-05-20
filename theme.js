// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    body: "Inter, serif",
    heading: "Inter, serif",
    mono: "monospace",
  },
});
