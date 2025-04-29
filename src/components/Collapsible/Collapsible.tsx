import type { ReactNode, ComponentRef, CSSProperties } from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

/**
 * Returns closest element matching one of the given attribute-value pairs
 */
function closestAttributeMatch(
    element: Element | null,
    attributes: {
        name: string;
        value: string;
        split?: boolean;
    }[]
): Element | null {
    while (element) {
        for (const { name, value, split } of attributes) {
            const attr = element.getAttribute(name);

            if (split && attr?.split(" ").includes(value)) {
                return (element);
            }
            else if (attr === value) {
                return (element);
            }
        }
        element = element.parentElement;
    }

    return (null);
}

interface CollapsibleProps {
    children: ReactNode;
    id: string;
    isOpen: boolean;
    styles?: {
        wrapper?: string;
        content?: string;
    };
    duration?: number;
    onClickOut?: (e: MouseEvent) => void;
    onFocusOut?: (e: FocusEvent) => void;
    /**
     * Attribute of elements that should not
     * trigger `OnClickOut` and `onFocusOut`
    */
    onEventOff?: {
        name: string;
        value: string;
        split?: boolean;
    }[];
}

export function Collapsible({
    children,
    id,
    isOpen,
    styles,
    duration = .20,
    onEventOff = [],
    onClickOut,
    onFocusOut
}: CollapsibleProps) {
    const wrapperRef = useRef<ComponentRef<"div">>(null);
    const contentRef = useRef<ComponentRef<"div">>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [style, setStyle] = useState<CSSProperties>({
        overflow: "hidden",
        visibility: "hidden",
        transition:
            `max-height ${duration}s linear,` +
            `visibility ${duration}s linear`
    });

    useEffect(() => {
        if (!(wrapperRef.current instanceof Node)) return;
        const observer = new MutationObserver(() => {
            if (!contentRef.current) return;
            setRect(contentRef.current.getBoundingClientRect());
        });

        observer.observe(wrapperRef.current, {
            childList: true,
            subtree: true
        });

        return (() => observer.disconnect());
    }, []);

    useLayoutEffect(() => {
        if (!contentRef.current) return;

        setRect(contentRef.current.getBoundingClientRect());
    }, []);

    useLayoutEffect(() => {
        if (!rect) return;

        const zIndex = Number((contentRef || wrapperRef).current?.style.zIndex);
        const global: CSSProperties = {
            visibility: isOpen ? "visible" : "hidden",
            zIndex: Number.isNaN(zIndex) ? "auto" : isOpen ? zIndex + 1 : zIndex
        };

        setStyle((prev) => ({
            ...prev,
            ...global,
            maxHeight: isOpen ? `${rect.height}px` : "0px"
        }));
    }, [rect, isOpen]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper || !isOpen) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target;
            if (!wrapper || !(target instanceof Node)) return;

            if (target instanceof Element
                && closestAttributeMatch(target, [{
                    name: "aria-controls",
                    value: id,
                    split: true
                }, ...onEventOff])) return;

            if (!wrapper.contains(target)) onClickOut?.(e);
        }

        const handleFocusOut = (e: FocusEvent) => {
            const relatedTarget = e.relatedTarget;
            if (!wrapper || !(relatedTarget instanceof Node)) return;

            if (relatedTarget instanceof Element
                && closestAttributeMatch(relatedTarget, [{
                    name: "aria-controls",
                    value: id,
                    split: true
                }, ...onEventOff])) return;

            if (!wrapper.contains(relatedTarget)) onFocusOut?.(e);
        };

        document.addEventListener("click", handleClick);
        wrapper.addEventListener("focusout", handleFocusOut);

        return () => {
            document.removeEventListener("click", handleClick);
            wrapper.removeEventListener("focusout", handleFocusOut);
        };
    }, [id, isOpen, onEventOff, onClickOut, onFocusOut]);

    return (
        <div
            id={id}
            ref={wrapperRef}
            style={style}
            className={styles?.wrapper}
            aria-hidden={!isOpen}
        >
            <div
                ref={contentRef}
                className={styles?.content}
            >
                {children}
            </div>
        </div>
    );
}