import type { HTMLAttributes, ReactNode, ComponentRef } from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { interpolateNumber } from "../../utils/commons";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { useSlidable } from "./Slidable";

interface SlideProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isOpen: boolean;
    isFirst?: boolean;
    isGroup?: boolean;
}

export function Slide({
    children,
    isOpen = false,
    isFirst = false,
    isGroup = false,
    ...attributes
}: SlideProps) {
    const animationFrame = useAnimationFrame();
    const { internal: { config } } = useSlidable();
    const slideRef = useRef<ComponentRef<"div">>(null);
    const [isRender, setIsRender] = useState(
        (isOpen || isFirst) ? true : false
    );
    const [transition, setTransition] = useState({
        opacity: 0,
        x: 0,
        y: 0
    });

    useLayoutEffect(() => {
        if (!slideRef.current) return;
        const rect = slideRef.current.getBoundingClientRect();

        if (isOpen) {
            animationFrame(config.duration, (progress) => {
				setTransition({
                    opacity: interpolateNumber(0, 1, progress, 2),
					x: interpolateNumber(0, rect.height, progress),
					y: 0
				});
			})
        }

    }, [isOpen]);

    if (!isRender) return (null);
    return (
        <div
            {...attributes}
            ref={slideRef}
            style={{
                opacity: transition.opacity,
                transform: "translateX(" + transition.x + "px)"
            }}
        >
            {children}
        </div>
    );
}