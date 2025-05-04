import { useState, useRef, useEffect} from "react";

type Status = "IDLE" | "WAIT" | "DONE" | "FAIL";
interface Callback<D> {
	id: number;
	fn: (data: D) => Promise<D>
};
interface Config<I> {
	initial: I;
	subscribes?: unknown[];
};

function hasEqualItems(a: unknown[], b: unknown[]) {
	return (a.length === b.length && a.every((val, i) => val === b[i]));
}

/**
 * Custom hook to manage a queue of asynchronous requests, ensuring they are executed in order and one at a time.
 * The hook provides an API to add requests to the queue, track their status, and avoid state updates on unmounted components.
 * 
 * @param config - The configuration object containing the initial data and subscribes.
 * @param callback - The callback function to be executed with the data. Should return a promise.
 * @returns
 * - `data`: The current state of the request (initial data or result from the callback).
 * - `status`: Current status of the request (`IDLE`, `WAIT`, `DONE`, `FAIL`).
 * - `execute`: Function to add a new request to the queue.
 */
export function useRequestQueue<I, D = I>(
	{ initial, subscribes }: Config<I>,
	callback: Callback<I | D>['fn']
) {
	const [callbacks, setCallbacks] = useState<Callback<I | D>[]>([]);
	const [status, setStatus] = useState<Status>("IDLE");
	const [data, setData] = useState<I | D>(initial);
	const prevSubscribesRef = useRef<unknown[]>(null);
	const instanceIdRef = useRef(0);

	useEffect(() => {
		return () => {
			prevSubscribesRef.current = null;
			instanceIdRef.current += 1;
			setCallbacks([]);
		}
	}, []);

	const process = async (callback: Callback<I | D>) => {
		setStatus("WAIT");
		try {
			const result = await callback.fn(data);

			if (callback.id === instanceIdRef.current) {
				setStatus("DONE");
				setData(result);
			}
		} catch (err) {
			if (callback.id === instanceIdRef.current) {
				setStatus("FAIL");
				console.error(err);
			}
		}
	};

	useEffect(() => {
		if (status === "WAIT" || !callbacks.length) return;

		process(callbacks[0]);
		setCallbacks(prev => prev.slice(1));
	}, [status, callbacks]);

	useEffect(() => {
		if (!subscribes) return;

		if (!prevSubscribesRef.current 
			|| !hasEqualItems(prevSubscribesRef.current, subscribes)) {
			prevSubscribesRef.current = subscribes;
			setCallbacks(prev => [...prev, {
				id: instanceIdRef.current,
				fn: callback
			}]);
		}
	});

	const execute = () => {
		setCallbacks(prev => [...prev, {
			id: instanceIdRef.current,
			fn: callback
		}]);
	};

	return [data, status, execute] as const;
}