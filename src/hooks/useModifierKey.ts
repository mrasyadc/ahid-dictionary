import { useState, useEffect } from "react";

export const useModifierKey = (): string => {
  const [modifier, setModifier] = useState("Alt");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMac = 
        navigator.platform.toUpperCase().indexOf('MAC') >= 0 || 
        navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
        
      if (isMac) {
        setModifier("Cmd");
      }
    }
  }, []);

  return modifier;
};
