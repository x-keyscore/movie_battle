import type { ReactNode, ComponentRef, CSSProperties } from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

interface CollapsibleProps {
    children: ReactNode;
    id: string;
    isOpen: boolean;
    zIndex?: number;
    styles?: {
        wrapper?: string;
        content?: string;
    };
    without?: "bottom" | "right";
    duration?: number;
    onClickOut?: (e: MouseEvent) => void;
    onFocusOut?: (e: FocusEvent) => void;
}

export function Collapsible({
    children,
    id,
    styles,
    zIndex,
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

    useLayoutEffect(() => {
        if (!rect) return;
    
        const global: CSSProperties = {
            visibility: isOpen ? "visible" : "hidden",
            zIndex: isOpen ? zIndex ? zIndex + 1 : undefined : zIndex
        };

        if (without === "right") {
            setStyle((prev) => ({
                ...prev,
                ...global,
                maxWidth: isOpen ? `${rect.width}px` : "0px"
            }));
        } else if (without === "bottom") {
            setStyle((prev) => ({
                ...prev,
                ...global,
                maxHeight: isOpen ? `${rect.height}px` : "0px"
            }));
        }
    }, [isOpen, zIndex, without, rect]);

    useEffect(() => {
        const wrapper = ref.current;
        if (!wrapper || !isOpen) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target;
            if (!wrapper || !(target instanceof Node)) return;

            if (target instanceof Element
                && target.closest(`[aria-controls="${id}"]`)) return;

            if (!wrapper.contains(target)) onClickOut?.(e);
        }

        const handleFocusOut = (e: FocusEvent) => {
            const relatedTarget = e.relatedTarget;
            if (!wrapper || !(relatedTarget instanceof Node)) return;
    
            if (!wrapper.contains(relatedTarget)) onFocusOut?.(e);
        };

        document.addEventListener("click", handleClick);
        wrapper.addEventListener("focusout", handleFocusOut);

        return () => {
          document.removeEventListener("click", handleClick);
          wrapper.removeEventListener("focusout", handleFocusOut);
        };
    }, [id, isOpen, onClickOut, onFocusOut]);

    return (
        <div
            id={id}
            ref={ref}
            style={style}
            className={styles?.wrapper}
            aria-hidden={!isOpen}
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