import { useState, useRef, useEffect } from "react";

type Status = "IDLE" | "PENDING" | "OK" | "ERROR";

function isEqual(a: unknown[], b: unknown[]) {
	return a.length === b.length && a.every((val, i) => val === b[i]);
}

/**
 * Custom React hook to manage async requests with status tracking and dependency-based triggering.
 *
 * This hook executes the provided async `callback` function whenever the `dependencies` array changes.
 * It also provides a manual `execute()` method to trigger the request on demand.
 *
 * Usage:
 * ```tsx
 * const [data, status, execute] = useRequest(fetchUserData, [userId]);
 * ```
 *
 * @template T - The return type of the async `callback` function
 * @param initial - Initial value set for the data state
 * @param callback - An async function
 * @param dependencies - Optional array of dependencies to watch for automatic execution `callback`
 * @returns [data, status, execute] - The fetched data, current status, and manual trigger `callback`
 */
export function useRequest<I, D = I>(
	initial: I,
	callback: (prevData: () =>  I | D) => Promise<D>,
	dependencies?: unknown[],
) {
	const [status, setStatus] = useState<Status>("IDLE");
	const [data, setData] = useState<I | D>(initial);
	const prevDepsRef = useRef<unknown[]>(null);
	const callbackRef = useRef(callback);
	const launchIdRef = useRef(0);
	const dataRef = useRef(data);

	callbackRef.current = callback;
	dataRef.current = data;

	const launch = async (launchId: number) => {
		setStatus("PENDING");
		try {
			const result = await callbackRef.current(() => dataRef.current);
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
	};

	useEffect(() => {
		if (!dependencies) return;

		if (!prevDepsRef.current || !isEqual(prevDepsRef.current, dependencies)) {
			prevDepsRef.current = dependencies;
			launch(++launchIdRef.current);
		}
	});

	const execute = () => {
		launch(++launchIdRef.current);
	};

	return [data, status, execute] as const;
}
