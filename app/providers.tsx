// app/providers.tsx
"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import "@fontsource/inter/700.css";
import "@fontsource/inter/400.css";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Inter, sans-serif' },
        body: { value: 'Inter, sans-serif' },
      }
    },
    semanticTokens: {
      colors: {
        'chakra-body-text': { 
          value: { _light: '{colors.gray.800}', _dark: '{colors.whiteAlpha.900}' }
        },
        'chakra-body-bg': { 
          value: { _light: '{colors.white}', _dark: '{colors.gray.800}' }
        }
      }
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}
