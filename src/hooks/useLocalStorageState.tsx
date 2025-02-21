import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../services/localStorage";

type Props<T> = {
  localStorageKey: string;
  defaultValue: T;
  onChange?: (data: T) => void;
};

export function useLocalStorageState<T>({
  localStorageKey,
  defaultValue,
  onChange,
}: Props<T>) {
  const [data, setData] = useState<T>(
    getLocalStorage(localStorageKey) ?? defaultValue
  );

  useEffect(() => {
    console.log("%cSaving data to local storage", "color: green");
    setLocalStorage(localStorageKey, data);
    onChange?.(data);
  }, [data]);

  return {
    data,
    setData,
  };
}
