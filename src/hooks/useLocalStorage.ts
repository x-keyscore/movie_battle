import { useEffect, useState } from "react";

const PREFIX = "CINESCOPE";

export function useLocalStorage(key: string, initialValue: () => unknown | unknown) {
    const prefixedKey: string = PREFIX + "-" + key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        if (value != null) localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}