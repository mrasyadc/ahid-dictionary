import { useState, useEffect, FunctionComponent } from "react";

export const useKeyPress = (targetKey: string): boolean => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // If pressed key is our target key then set to true
    const downHandler = (): void => {
      if (targetKey) {
        setKeyPressed(true);
      }
    };

    // If released key is our target key then set to false
    const upHandler = (): void => {
      if (targetKey) {
        setKeyPressed(false);
      }
    };

    // Add event listeners
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
