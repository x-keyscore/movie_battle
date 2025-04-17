import { useCallback, useEffect, useRef, useState } from "react";

type Status = "IDLE" | "PENDING" | "OK" | "ERROR";

export function useRequest<T>(callback: () => Promise<T>) {
    const [status, setStatus] = useState<Status>("IDLE");
    const [data, setData] = useState<T | null>(null);
    const isFetch = useRef(false);

    const fetch = useCallback(async () => {
        if (isFetch.current) return;
        isFetch.current = true;

        setStatus("PENDING");
        try {
            const result = await callback();
            setData(result);
            setStatus("OK");
        } catch (err) {
            console.error(err);
            setStatus("ERROR");
        }
    }, [callback]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return [data, status] as const;
}