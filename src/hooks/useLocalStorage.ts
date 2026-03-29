"use client";

import { useCallback,useEffect, useState } from "react";

/**
 * A hook that synchronization state with localStorage.
 * Handles SSR gracefully by only accessing localStorage on the client.
 */

// Global session-level cache to prevent flickering during internal navigation
const sessionCache = new Map<string, any>();

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (sessionCache.has(key)) return sessionCache.get(key);
    return initialValue;
  });

  // Once the component is mounted on the client, read from localStorage
  useEffect(() => {
    if (globalThis.window === undefined) return;

    try {
      const item = globalThis.localStorage.getItem(key);
      if (item) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Update session cache
        sessionCache.set(key, valueToStore);

        // Save to local storage
        if (globalThis.window !== undefined) {
          globalThis.localStorage.setItem(key, JSON.stringify(valueToStore));
        }

        // Dispatch a custom event so other instances of the same hook
        // in different components can update their state.
        globalThis.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Sync with changes from other tabs or components
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = globalThis.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch {
        // silent
      }
    };

    globalThis.addEventListener("storage", handleStorageChange);
    globalThis.addEventListener("local-storage", handleStorageChange);

    return () => {
      globalThis.removeEventListener("storage", handleStorageChange);
      globalThis.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}
