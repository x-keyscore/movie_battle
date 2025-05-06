import { useEffect, useRef } from 'react';

export function useAnimationFrame() {
	const frameId = useRef<number | null>(null);
	const start = useRef<number | null>(null);

	const animate = (
		time: number,
		duration: number,
		callback: (progress: number) => void
	) => {
		if (start.current === null) start.current = time;
		const elapsed = time - start.current;
		const progress = Math.min(elapsed / duration, 1);

		callback(progress);

		if (progress < 1) {
			frameId.current = requestAnimationFrame((t) => animate(t, duration, callback));
		} else {
			start.current = null;
			frameId.current = null;
		}
	};

	const startAnimation = (duration: number, callback: (progress: number) => void) => {
		if (frameId.current) cancelAnimationFrame(frameId.current);
		start.current = null;
		frameId.current = requestAnimationFrame((t) => animate(t, duration, callback));
	};

	useEffect(() => {
		return () => {
			if (frameId.current) cancelAnimationFrame(frameId.current);
		};
	}, []);

	return startAnimation;
}