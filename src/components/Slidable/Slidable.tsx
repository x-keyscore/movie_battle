import type { Slide, SlidableContextValue, HandleSlideOpen } from "./types";
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

    const handleSlideOpen: HandleSlideOpen = (slide: Slide) => {
        const sequence = sequenceRef.current;

        const index = sequence.findIndex(item => item.id === slide.id);

        if (index) {
            sequence[index + 1]?.close();
            sequenceRef.current.slice(0, index);
            sequenceRef.current.push(slide);

            return ({
                isIgnore: false,
                without: "LEFT"
            });
        }
        else if (sequence[sequence.length - 1].isGroup) {
            sequenceRef.current.push(slide);

            return ({
                isIgnore: true,
                without: null
            });
        }
        else {
            sequenceRef.current.push(slide);

            return ({
                isIgnore: false,
                without: "RIGHT"
            });
        }
    };

    return (
        <SlidableContext.Provider value={{
            internal: {
                config: { duration },
                handleSlideOpen
            }
        }}>
            <div
                ref={sectionRef}
                {...attributes}
            >
                {children}
            </div>
        </SlidableContext.Provider>
    );
}