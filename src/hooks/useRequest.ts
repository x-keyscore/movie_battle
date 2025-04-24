import { useState, useRef, useEffect } from "react";

type Status = "IDLE" | "PENDING" | "OK" | "ERROR";

function isEqual(a: unknown[], b: unknown[]) {
	return (a.length === b.length && a.every((val, i) => val === b[i]));
}

/**
 * Custom React hook to manage async requests with status tracking and dependency-based triggering.
 *
 * This hook executes the provided async `callback` function whenever the `dependencies` array changes.
 * It also provides a manual `fetcher()` method to trigger the request on demand.
 *
 * Usage:
 * ```tsx
 * const [data, status, fetcher] = useRequest(fetchUserData, [userId]);
 * ```
 *
 * @template T - The return type of the async `callback` function
 * @param callback - An async function to be executed
 * @param dependencies - Optional array of dependencies to watch for automatic execution
 * @returns [data, status, fetcher] - The fetched data, current status, and manual trigger function
 */
export function useRequest<T>(callback: () => Promise<T>, dependencies?: unknown[]) {
	const [status, setStatus] = useState<Status>("IDLE");
	const [data, setData] = useState<T | null>(null);
	const prevDepsRef = useRef<unknown[]>(null);
	const callbackRef = useRef(callback);
	const launchIdRef = useRef(0);

	callbackRef.current = callback;

	const launch = async (launchId: number) => {
		setStatus("PENDING");
		try {
			const result = await callbackRef.current();
			if (launchIdRef.current === launchId) {
				setStatus("OK");
				setData(result);
			}
		} catch (err) {
			if (launchIdRef.current === launchId) {
				setStatus("ERROR");
				console.error(err);
			}
		}
	}

	useEffect(() => {
		if (!dependencies) return;

		if (!prevDepsRef.current || !isEqual(prevDepsRef.current, dependencies)) {
			prevDepsRef.current = dependencies;
			launch(++launchIdRef.current);
		}
	});

	const fetcher = () => {
		launch(++launchIdRef.current);
	}

	return [data, status, fetcher] as const;
}