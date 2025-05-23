import type { ReactNode, ComponentRef, CSSProperties } from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { closestAttributes } from "../../utils/commons";

interface FoldableProps {
    children: ReactNode;
    id: string;
    isOpen: boolean;
    styles?: {
        section?: string;
        content?: string;
    };
    duration?: number;
    onClickOut?: (e: MouseEvent) => void;
    onFocusOut?: (e: FocusEvent) => void;
    onEventOff?: {
        name: string;
        value: string;
        split?: boolean;
    }[];
}

export function Foldable({
    children,
    id,
    isOpen,
    styles,
    duration = .20,
    onEventOff = [],
    onClickOut,
    onFocusOut
}: FoldableProps) {
    const sectionRef = useRef<ComponentRef<"div">>(null);
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
        if (!(sectionRef.current instanceof Node)) return;
        const observer = new MutationObserver(() => {
            if (!contentRef.current) return;
            setRect(contentRef.current.getBoundingClientRect());
        });

        observer.observe(sectionRef.current, {
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

        const zIndex = Number((sectionRef || contentRef).current?.style.zIndex);
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
        const section = sectionRef.current;
        if (!section || !isOpen) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target;
            if (!section || !(target instanceof Node)) return;

            if (target instanceof Element
                && closestAttributes(target, [{
                    name: "aria-controls",
                    value: id,
                    split: true
                }, ...onEventOff])) return;

            if (!section.contains(target)) onClickOut?.(e);
        }

        const handleFocusOut = (e: FocusEvent) => {
            const relatedTarget = e.relatedTarget;
            if (!section || !(relatedTarget instanceof Node)) return;

            if (relatedTarget instanceof Element
                && closestAttributes(relatedTarget, [{
                    name: "aria-controls",
                    value: id,
                    split: true
                }, ...onEventOff])) return;

            if (!section.contains(relatedTarget)) onFocusOut?.(e);
        };

        document.addEventListener("click", handleClick);
        section.addEventListener("focusout", handleFocusOut);

        return () => {
            document.removeEventListener("click", handleClick);
            section.removeEventListener("focusout", handleFocusOut);
        };
    }, [id, isOpen, onEventOff, onClickOut, onFocusOut]);

    return (
        <div
            id={id}
            ref={sectionRef}
            style={style}
            className={styles?.section}
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