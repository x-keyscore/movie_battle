import type { ReactNode, ComponentRef, CSSProperties, FocusEvent, FocusEventHandler} from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

interface CollapsibleProps {
    children: ReactNode;
    /** **Description:** Define whether the display is open or closed. */
    isOpen: boolean;
    id?: string;
    /**
     * **Description:** Define the direction of the animation. 
     * 
     * **Default**: `"bottom"`
     */
    without?: "bottom" | "right";
    /** 
     * **Description:** Define the time before the start of the animation.
     * 
     * **Unit:** second
     * 
     * **Default:** `0`
     */
    delay?: number;
    /**
     * **Description:** Define the duration of the animation.
     * 
     * **Unit**: second
     * 
     * **Default**: `0.25`
     */
    duration?: number;
    onBlur?: (e: FocusEvent<HTMLDivElement, Element>) => void;
}

export function Collapsible({
    children,
    isOpen,
    id,
    without = "bottom",
    delay = 0,
    duration = .25,
    onBlur,
}: CollapsibleProps) {
    const ref = useRef<ComponentRef<"div">>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [style, setStyle] = useState<CSSProperties>({
            overflow: "hidden",
            visibility: "hidden",
            transitionDelay: `${delay}s`,
            transition: 
                `width ${duration}s linear,` +
                `height ${duration}s linear,` +
                `visibility ${duration}s linear`
        }
    );

    useLayoutEffect(() => {
        if (!ref.current) return;

        setRect(ref.current.getBoundingClientRect());
    }, []);

    useEffect(() => {
        if (!ref.current || !rect) return;

        if (isOpen) {
            if (without === "right") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "visible",
                    width: rect.width + "px"
                }));
            }
            else if (without === "bottom") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "visible",
                    height: rect.height + "px"
                }));
            }
        } else {
            if (without === "right") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "hidden",
                    width: "0px"
                }));
            }
            else if (without === "bottom") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "hidden",
                    height: "0px"
                }));
            }
        };
    }, [isOpen, without, rect]);

    const handleOnBlur: FocusEventHandler<HTMLDivElement> = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            onBlur?.(e);
        }
    }

    return (
        <div id={id} ref={ref} style={style} onBlur={handleOnBlur}>
            <div style={{ height: rect?.height + "px" }}>
                {children}
            </div>
        </div>
    );
}