// 1. Import `extendTheme`
import { Steps, createSystem, defaultConfig } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: {
          value: "Inter, serif",
        },
        heading: {
          value: "Inter, serif",
        },
        mono: {
          value: "monospace",
        },
      },
    },
  },
});
