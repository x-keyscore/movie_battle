import { useState, useRef, useEffect } from "react";

type Status = "IDLE" | "WAIT" | "DONE" | "FAIL";
type Config<I> = { initial: I; subscribes?: unknown[]; };
type Callback<D> = (data: D) => Promise<D>;

function hasEqualItems(a: unknown[], b: unknown[]) {
	return (a.length === b.length && a.every((val, i) => val === b[i]));
}

export function useRequest<I, D = I>(
	{ initial, subscribes }: Config<I>,
	callback: Callback<I | D>
) {
	const [status, setStatus] = useState<Status>("IDLE");
	const [data, setData] = useState<I | D>(initial);
	const prevSubscribesRef = useRef<unknown[]>(null);
	const idRef = useRef(0);

	const process = async (callback: Callback<I | D>) => {
		const id = idRef.current += 1;

		setStatus("WAIT");
		try {
			const result = await callback(data);

			if (id === idRef.current) {
				setData(result);
				setStatus("DONE");
			}
		} catch (err) {
			if (id === idRef.current) {
				console.error(err);
				setStatus("WAIT");
			}
		}
	};

	useEffect(() => {
		return () => {
			prevSubscribesRef.current = null;
			idRef.current += 1;
		}
	}, []);

	useEffect(() => {
		if (!subscribes) return;

		if (!prevSubscribesRef.current 
			|| !hasEqualItems(prevSubscribesRef.current, subscribes)) {
			prevSubscribesRef.current = subscribes;
			process(callback);
		}
	});

	const execute = () => {
		process(callback);
	};

	return [data, status, execute] as const;
}
