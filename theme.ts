import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: "Inter, serif" },
        heading: { value: "Inter, serif" },
        mono: { value: "monospace" },
      },
    },
  },
})
