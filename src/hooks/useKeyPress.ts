import { useEffect,useState } from "react";

export const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    };

    globalThis.addEventListener("keydown", downHandler);
    globalThis.addEventListener("keyup", upHandler);

    return () => {
      globalThis.removeEventListener("keydown", downHandler);
      globalThis.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
