import type { ReactNode, ComponentRef, CSSProperties} from "react";
import { useRef, useLayoutEffect, useState } from "react";

interface CollapsibleProps {
	className?: string;
	children?: ReactNode;
	/** @description Define the direction of the animation. */
	without: "bottom" | "right";
    /** @description Define whether the display is open or closed. */
	isOpen: boolean;
	/** @description Define the time before the start of the animation. Unit in second. Default 0s */
	delay?: number;
	/** @description Define the duration of the animation. Unit in second. Default .25s */
	duration?: number;
}

/**
 * Create a downward or rightward opening animation.
 */
export function Collapsible({
	className,
    children,
	without,
    isOpen,
    delay = 0,
    duration = .20
}: CollapsibleProps) {
	const ref = useRef<ComponentRef<"div">>(null);
	const [rect, setRect] = useState<DOMRect | null>(null);

	useLayoutEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setRect(rect);
		}
	}, []);

	let staticStyle: CSSProperties = {};
	let mutableStyle: CSSProperties = {};
	if (without === "right") {
		staticStyle = {
			width: "100%",
			overflow: "hidden",
			visibility: "hidden",
			transitionDelay: `${delay.toString()}s`,
			transition: `width ${duration.toString()}s linear, visibility ${duration.toString()}s linear`	
		}

		if (rect && isOpen) mutableStyle = { visibility: "visible", width: rect.width };
		else mutableStyle = { visibility: "hidden", width: "0px" };
	}
	else if (without === "bottom") {
		staticStyle = {
			height: "100%",
			overflow: "hidden",
			visibility: "hidden",
			transitionDelay: `${delay.toString()}s`,
			transition: `height ${duration.toString()}s linear, visibility ${duration.toString()}s linear`
		}

		if (rect && isOpen) mutableStyle = { visibility: "visible", height: rect.height };
		else if (rect && !isOpen) mutableStyle = { visibility: "hidden", height: "0px" };
	}

	let contentStaticStyle: CSSProperties = {};
	if (rect) contentStaticStyle = { height: rect?.height + "px"};

	return (
		<div ref={ref} className={className} style={{ ...staticStyle, ...mutableStyle }} >
			<div style={contentStaticStyle}>
				{children}
			</div>
		</div>
	);
}