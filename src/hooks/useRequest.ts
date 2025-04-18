import { useEffect, useRef, useState } from "react";

type Status = "IDLE" | "PENDING" | "OK" | "ERROR";

export function useRequest<T>(callback: () => Promise<T>, deps: unknown[]) {
	const [status, setStatus] = useState<Status>("IDLE");
	const [data, setData] = useState<T | null>(null);

	const callbackRef = useRef(callback);
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		let ignore = false;
		setStatus("PENDING");

		console.log("exec");

		(async () => {
			try {
				const result = await callbackRef.current();
				if (!ignore) {
					setData(result);
					setStatus("OK");
				}
			} catch (err) {
				if (!ignore) {
					console.error(err);
					setStatus("ERROR");
				}
			}
		})();

		return () => {
			ignore = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return [data, status] as const;
}
