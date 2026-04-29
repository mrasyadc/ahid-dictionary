"use client"

import { ChakraProvider } from "@chakra-ui/react";

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/components/ui/color-mode"
import { EmotionRegistry } from "@/components/ui/emotion-registry";
import { system } from "@/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </EmotionRegistry>
  )
}
