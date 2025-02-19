import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../services/localStorage";

type Props<T> = {
  localStorageKey: string;
  defaultValue: T;
};

export function useLocalStorageState<T>({
  localStorageKey,
  defaultValue,
}: Props<T>) {
  const [data, setData] = useState<T>(
    getLocalStorage(localStorageKey) ?? defaultValue
  );

  useEffect(() => {
    console.log("%cSaving data to local storage", "color: green");
    setLocalStorage(localStorageKey, data);
  }, [data]);

  return {
    data,
    setData,
  };
}
