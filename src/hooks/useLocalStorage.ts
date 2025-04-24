import { useEffect, useState } from "react";

const PREFIX = import.meta.env.VITE_APP_PREFIX;

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const prefixedKey: string = PREFIX + "-" + key;
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        if (value != null) localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue] as const;
}