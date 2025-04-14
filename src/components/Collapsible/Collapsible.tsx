import { ReactNode, useRef, useLayoutEffect, useState, ComponentRef } from "react";

interface CollapsibleProps {
	children?: ReactNode;
    /** @description Define whether the display is open or closed. */
	isOpen: boolean;
    /** @description Define the direction of the animation. */
	direction: "down" | "right";
	/** @description Define the time before the start of the animation. Unit in second. Default 0s */
	delay?: number;
	/** @description Define the duration of the animation. Unit in second. Default .25s */
	duration?: number;
}

/**
 * Create a downward or rightward opening animation.
 * 
 * Props: `open`, `dir`, `delay`, `duration`
 */
export function Collapsible({
    children,
    isOpen,
    direction,
    delay = 0,
    duration = .25
}: CollapsibleProps) {
	const targetRef = useRef<ComponentRef<"div">>(null);
	const [targetSize, setTargetSize] = useState<{
		isCapture: boolean,
		width: number,
		height: number
	}>({
		isCapture: false,
		width: 0,
		height: 0
	});

	useLayoutEffect(() => {
		if (targetRef.current) {
			setTargetSize({
				isCapture: true,
				width: targetRef.current.offsetWidth,
				height: targetRef.current.offsetHeight
			});
		}
	}, []);

	let staticStyle = {};
	if (direction === "right")
	{
		staticStyle = {
			overflow: "hidden",
			transitionDelay: `${delay.toString()}s`,
			// Visibility transition for deactivate the focus
			transition: `width ${duration.toString()}s linear, visibility ${duration.toString()}s linear`,
			height: "100%"
		}
	}
	else if (direction === "down")
	{
		staticStyle = {
			overflow: "hidden",
			transitionDelay: `${delay.toString()}s`,
			// Visibility transition for deactivate the focus
			transition: `height ${duration.toString()}s linear, visibility ${duration.toString()}s linear`,
			width: "100%"
		}
	}

	let mutableStyle = {};
	if (targetSize.isCapture && !isOpen) {
		if (direction === "right") mutableStyle = { visibility: "hidden", width: "0px" }
		else if (direction === "down") mutableStyle = { visibility: "hidden", height: "0px" }
	} else if (targetSize.isCapture && isOpen) {
		if (direction === "right") mutableStyle = { visibility: "visible", width: targetSize.width + "px" }
		else if (direction === "down") mutableStyle = { visibility: "visible", height: targetSize.height + "px" }
	}

    /*
	let contentStaticStyle = {};
	if (targetSize.isCapture) {
		if (direction === "right") contentStaticStyle = { width: targetSize.width + "px"}
		else if (direction === "down") contentStaticStyle = { height: targetSize.height + "px"}
	}

	return (
		<div ref={targetRef} style={{...staticStyle, ...mutableStyle}} >
			<div style={contentStaticStyle}>
				{children}
			</div>
		</div>
	);
    */

    return (
		<div ref={targetRef} style={{...staticStyle, ...mutableStyle}} >
			{children}
		</div>
	);
}