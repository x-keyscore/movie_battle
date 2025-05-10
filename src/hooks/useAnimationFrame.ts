import { useRef, useEffect } from 'react';

export function useAnimationFrame() {
	const frame = useRef<number | null>(null);
	const start = useRef<number | null>(null);

	const animate = (
		time: number,
		duration: number,
		callback: (progress: number) => void
	) => {
		const delta = time - start.current!;
		const progress = Math.min(delta / duration, 1);

		callback(progress);

		if (progress < 1) {
			frame.current = requestAnimationFrame((t) => animate(t, duration, callback));
		} else {
			start.current = null;
			frame.current = null;
		}
	};

	const startAnimation = (duration: number, callback: (progress: number) => void) => {
		if (frame.current) cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame((time) => {
			start.current = time;
			animate(time, duration, callback);
		});
	};

	const cancelAnimation = () => {
		if (frame.current) cancelAnimationFrame(frame.current);
		frame.current = null;
		start.current = null;
	};

	useEffect(() => () => {
		cancelAnimation();
	}, []);

	return [startAnimation, cancelAnimation] as const;
}