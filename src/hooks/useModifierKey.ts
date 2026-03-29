import { useEffect } from "react";

import { useLocalStorage } from "@/src/hooks/useLocalStorage";

/**
 * A hook that detects the appropriate modifier key (Cmd for Mac, Alt for others).
 * Uses the useLocalStorage hook to persist the detection across reloads and navigations.
 */
export const useModifierKey = (): string => {
  const [modifier, setModifier] = useLocalStorage<string>("modifier-key", "Alt");

  useEffect(() => {
    // Detect OS if we're on the client
    if (globalThis.window !== undefined) {
      const isMac = 
        navigator.platform.toUpperCase().includes("MAC") || 
        navigator.userAgent.toUpperCase().includes("MAC");
      
      const detected = isMac ? "Cmd" : "Alt";
      
      // Update if the detected value differs from the current stored value
      if (detected !== modifier) {
        setModifier(detected);
      }
    }
  }, [modifier, setModifier]);

  return modifier;
};
