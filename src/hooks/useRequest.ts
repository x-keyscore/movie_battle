import { useState, useRef, useEffect } from "react";

type Status = "IDLE" | "PENDING" | "OK" | "ERROR";

function isEqualDeps(prevDeps: unknown[], currDeps: unknown[]): boolean {
	if (prevDeps.length !== currDeps.length) {
	  return (false);
	}

	for (let i = 0; i < prevDeps.length; i++) {
	  if (prevDeps[i] !== currDeps[i]) {
		return (false);
	  }
	}

	return (true);
}

/**
 * Custom hook that handles async requests.
 * 
 * @param callback - The async function to be executed (e.g. fetching data).
 * @param deps - The dependency array to trigger re-fetch when values change.
 * 
 * If `deps` is `undefined` or `null` the execution of the fetch is only manual.
 * 
 * @returns An array with the following:
 *   - `data`: The fetched data (or null while loading).
 *   - `status`: The current status of the request (`IDLE`, `PENDING`, `OK`, or `ERROR`).
 *   - `fetcher`: A function to manually trigger the request.
 * 
 * @example
 * ```js
 * // One fetch every time id changes
 * function Component() {
 *     const [data, status, execute] = useRequest(async () => {
 *     const response = await fetch(`/api/data/${id}`);
 *         return response.json();
 *     }, [id]);
 * 
 *     return (<div>{data}</div>);
 * }
 * 
 * // No automatic fetch
 * function Component() {
 *     const [data, status, fetch] = useRequest(async () => {
 *     const response = await fetch(`/api/data/${id}`);
 *         return response.json();
 *     });
 * 
 *     useEffect(() => {
 *         execute();
 *     }, [])
 * 
 *     return (<div>{data}</div>);
 * }
 * ```
 */
export function useRequest<T>(callback: () => Promise<T>, dependencies?: unknown[]) {
	const [status, setStatus] = useState<Status>("IDLE");
	const [data, setData] = useState<T | null>(null);
	const dependenciesRef = useRef<unknown[] | null>(null);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;

	const execute = () => {
		let ignore = false;

		const run = async () => {
			setStatus("PENDING");
			try {
				const result = await callbackRef.current();
				console.log("test")
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
		}
		run();

		return (() => {
			ignore = true;
		});
	}

	useEffect(() => {
		if (!dependencies) return;

		const prevdependencies = dependenciesRef.current;
		if (!prevdependencies || !isEqualDeps(prevdependencies, dependencies)) {
			dependenciesRef.current = [...dependencies];
			execute();
		}
	}, [dependencies]);

	return [data, status, execute] as const;
}
