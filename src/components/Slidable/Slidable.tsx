import type { Slide, SlidableContextValue, HandleOpen } from "./types";
import type { ReactNode, ComponentRef, HTMLAttributes } from "react";
import { createContext, useContext, useRef, useEffect } from "react";
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

    const handleOpen: HandleOpen = (slide: Slide) => {
        const sequence = sequenceRef.current;
        const index = sequence.findIndex(item => item.id === slide.id);
        const last = sequence[sequence.length - 1];

        // IF FIRST OF THE SEQUENCE OR LAST IS GROUP
        if (!sequence.length || (last && last.isGroup)) {
            sequenceRef.current.push(slide);
            return (null);
        }

        // IF ALREADY IN THE SEQUENCE
        if (index !== -1) {
            sequence.slice(0, index);
            sequence.push(slide);
            last.handleClose({
                from: "CENTER",
                to: "RIGHT"
            });

            return ({
                from: "LEFT",
                to: "CENTER"
            });
        }

        sequence.push(slide);
        last.handleClose({
            from: "CENTER",
            to: "LEFT"
        });

        return ({
            from: "RIGHT",
            to: "CENTER"
        });
    };

    return (
        <SlidableContext.Provider value={{
            internal: {
                config: { duration },
                handleOpen
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