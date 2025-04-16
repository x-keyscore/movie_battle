import type { ReactNode, ComponentRef, CSSProperties, FocusEvent } from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

interface CollapsibleProps {
    children: ReactNode;
    id: string;
    isOpen: boolean;
    styles?: {
        wrapper?: string;
        content?: string;
    };
    /**
     * **Description:** Define the direction of the animation. 
     * 
     * **Default**: `"bottom"`
     */
    without?: "bottom" | "right";
    /**
     * **Description:** Define the duration of the animation.
     * 
     * **Unit**: second
     * 
     * **Default**: `0.25`
     */
    duration?: number;
    onClickOut?: (e: MouseEvent) => void;
    onFocusOut?: (e: FocusEvent) => void;
}

export function Collapsible({
    children,
    id,
    styles,
    isOpen,
    without = "bottom",
    duration = .20,
    onFocusOut,
    onClickOut
}: CollapsibleProps) {
    const ref = useRef<ComponentRef<"div">>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [style, setStyle] = useState<CSSProperties>({
            overflow: "hidden",
            visibility: "hidden",
            transition:
                `max-width ${duration}s linear,` +
                `max-height ${duration}s linear,` +
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
                    maxWidth: rect.width + "px"
                }));
            }
            else if (without === "bottom") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "visible",
                    maxHeight: rect.height + "px"
                }));
            }
        } else {
            if (without === "right") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "hidden",
                    maxWidth: "0px"
                }));
            }
            else if (without === "bottom") {
                setStyle((prev) => ({
                    ...prev,
                    visibility: "hidden",
                    maxHeight: "0px"
                }));
            }
        };
    }, [isOpen, without, rect]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (!ref.current) return;
            const target = e.target;

            if (target instanceof Element
                && target.closest(`[aria-controls="${id}"]`)) return;

            if (target instanceof Node
                && !ref.current.contains(target)) onClickOut?.(e);
        }

        document.addEventListener("click", handleClick);

        return () => {
          document.removeEventListener("click", handleClick);
        };
    }, [id, isOpen, onClickOut]);

    const handleBlur = (e: FocusEvent) => {
        if (!ref.current) return;
        const relatedTarget = e.relatedTarget;

        if (relatedTarget instanceof Node
            && !ref.current.contains(relatedTarget)) onFocusOut?.(e);
    }

    return (
        <div
            id={id}
            ref={ref}
            style={style}
            className={styles?.wrapper}
            aria-hidden={!isOpen}
            onBlur={handleBlur}
        >
            <div
                style={{ height: rect?.height + "px" }}
                className={styles?.content}
            >
                {children}
            </div>
        </div>
    );
}