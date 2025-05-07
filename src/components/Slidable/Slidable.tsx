import type { SlidableContextValue, Slide, ObserveSlide } from "./types";
import type { ReactNode, ComponentRef, HTMLAttributes } from "react";
import { createContext, useContext, useRef, useEffect, useCallback } from "react";
import { closestAttributes } from "../../utils/commons";

const SlidableContext = createContext<SlidableContextValue | null>(null);

export function useSlidable(): SlidableContextValue {
    const value = useContext(SlidableContext);
    if (value === null) {
        throw new Error("Value is null");
    }
    return (value);
}

interface SlidableProps extends HTMLAttributes<HTMLDivElement>  {
    children: ReactNode;
    duration?: number;
    onEventOff?: {
        name: string;
        value: string;
        split?: boolean;
    }[];
    onClickOut?: (e: MouseEvent) => void;
    onFocusOut?: (e: FocusEvent) => void;
}

export function Slidable({
    children,
    duration = .20,
    onEventOff = [],
    onClickOut,
    onFocusOut,
    ...attributes
}: SlidableProps) {
    const sectionRef = useRef<ComponentRef<"div">>(null);
    const sequenceRef = useRef<Slide[]>([]);
    console.log(sequenceRef.current)
    useEffect(() => {
        return () => { sequenceRef.current = []; };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !(onClickOut && onFocusOut)) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target;
            if (!section || !(target instanceof Node)) return;

            if (target instanceof Element
                && closestAttributes(target, [...onEventOff])) return;

            if (!section.contains(target)) onClickOut(e);
        }

        const handleFocusOut = (e: FocusEvent) => {
            const relatedTarget = e.relatedTarget;
            if (!section || !(relatedTarget instanceof Node)) return;

            if (relatedTarget instanceof Element
                && closestAttributes(relatedTarget, [...onEventOff])) return;

            if (!section.contains(relatedTarget)) onFocusOut(e);
        };

        document.addEventListener("click", handleClick);
        section.addEventListener("focusout", handleFocusOut);

        return () => {
            document.removeEventListener("click", handleClick);
            section.removeEventListener("focusout", handleFocusOut);
        };
    }, [onEventOff, onClickOut, onFocusOut]);

    const observeSlide: ObserveSlide = useCallback((slide: Slide) => {
        if (!slide.isOpen) return;
        const slideIndex = sequenceRef.current.findIndex(item => item.id === slide.id);
        const prevSlide = sequenceRef.current[sequenceRef.current.length - 1];

        // IF FIRST OF THE SEQUENCE OR LAST IS GROUP
        if (!sequenceRef.current.length || (prevSlide && prevSlide.isGroup)) {
            sequenceRef.current.push(slide);
            return (null);
        }

        // IF ALREADY IN THE SEQUENCE
        if (slideIndex !== -1) {
            sequenceRef.current = sequenceRef.current.slice(0, slideIndex);
            sequenceRef.current.push(slide);
            prevSlide.handleClose({
                to: "RIGHT"
            });
            slide.handleOpen({
                from: "LEFT"
            });
        } else {
            sequenceRef.current.push(slide);
            prevSlide.handleClose({
                to: "LEFT"
            });
            slide.handleOpen({
                from: "RIGHT"
            });
        }
    }, []);

    return (
        <SlidableContext.Provider value={{
            internal: {
                config: { duration },
                observeSlide
            }
        }}>
            <div
                ref={sectionRef}
                style={{
                    position: "relative"
                }}
                {...attributes}
            >
                {children}
            </div>
        </SlidableContext.Provider>
    );
}