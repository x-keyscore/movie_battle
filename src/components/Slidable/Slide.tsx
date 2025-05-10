import type { HTMLAttributes, ReactNode, ComponentRef } from "react";
import type { DirectiveEvent, DirectiveTransition } from "./types";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { useSlidable, internalSymbol } from "./Slidable";

export function interpolate(from: number, to: number, progress: number, precision = 0): number {
    if (!precision) return (Math.round((from + (to - from) * progress)));
    const factor = 10 ** precision;
    return (Math.round((from + (to - from) * progress) * factor) / factor);
}

interface SlideProps extends Omit<HTMLAttributes<HTMLDivElement>, "ref"> {
    children: ReactNode;
    /**
     * Whether the slide is currently open.
     */
    isOpen: boolean;
    /**
     * Optional index used to determine the transition direction 
     * when switching between slides.
     * 
     * Indices are relative to sibling slides at the same depth, 
     * so in nested groups, you can start at zero independently.
     */
    index?: number | null;
    /**
     * Controls whether the slide stays mounted when not visible.
     * 
     * - "OPEN" (default): Only mounted when `isOpen` is true.
     * - "ALWAYS": Always mounted, even if not visible.
     * 
     * Ignored if `isGroup` is true — group slides are always
     * mounted when open.
     */
    render?: "OPEN" | "ALWAYS"
    /**
     * Marks the slide as a group that can contain nested slides.
     * 
     * Child slides can have their own independent `isOpen` state.
     * When the group opens, the first visible slide is the one
     * with `isOpen: true`.
     */
    isGroup?: boolean;
}

export function Slide({
    children,
    isOpen,
    index = null,
    render = "OPEN",
    isGroup = false,
    style, ...attributes
}: SlideProps) {
    const { [internalSymbol]: { config, syncSlide, killSlide } } = useSlidable();
    const [startAnimation] = useAnimationFrame();
    const timeoutRef = useRef<number | undefined>(undefined);
    const slideRef = useRef<ComponentRef<"div">>(null);
    const idRef = useRef(Math.floor(Math.random() * 9000) + 1000);
    const [transition, setTransition] = useState<DirectiveTransition | null>(null);
    const [isRender, setIsRender] = useState(isOpen);

    const startTransition = (transition: DirectiveTransition) => {
        if (!slideRef.current) { console.warn("'slideRef' is null"); return; };
        let rect = slideRef.current.getBoundingClientRect();

        if (transition?.from) {
            const fromHeight = transition.from === "LEFT" ? rect.height*-1 : rect.height;

            startAnimation(config.duration, (progress) => {
                if (!slideRef.current) return;

                const opacity = interpolate(0, 1, progress, 2);
                const translateX = interpolate(fromHeight, 0, progress);

                slideRef.current.style.opacity = opacity.toString();
                slideRef.current.style.transform = `translateX(${translateX}px)`;
            });
        } else if (transition?.to) {
            const toHeight = transition.to === "LEFT" ? rect.height*-1 : rect.height;

            startAnimation(config.duration, (progress) => {
                if (!slideRef.current) return;
                
                const opacity = interpolate(1, 0, progress, 2);
                const translateX = interpolate(0, toHeight, progress);
    
                slideRef.current.style.opacity = opacity.toString();
                slideRef.current.style.transform = `translateX(${translateX}px)`;
            });
        }
    }

    useLayoutEffect(() => {
        const handleDirective: DirectiveEvent = (directive) => {
            clearTimeout(timeoutRef.current);
            if (!directive.transition) setIsRender(directive.render);
            else {
                if (directive.render) setIsRender(true);
                if (!directive.render) {
                    timeoutRef.current = setTimeout(() => {
                        setIsRender(false);
                    }, config.duration);
                }
                setTransition(directive.transition);
            }
        };

        syncSlide(idRef.current, {
            index,
            isOpen,
            isGroup,
            isRender,
            applyDirective: handleDirective
        });
    }, [index, isOpen, isGroup, isRender]);

    useLayoutEffect(() => {
        if (!transition) return;

        startTransition(transition);
        setTransition(null);
    }, [transition]);

    useEffect(() => {
        return () => {
            killSlide(idRef.current);
            clearTimeout(timeoutRef.current);
        }
    }, []);

    if (!isRender && !(!isGroup && render === "ALWAYS")) return (null);
    return (
        <div
            ref={slideRef}
            style={{
                position: isGroup ? "relative" : "absolute",
                visibility: isRender ? "visible" : "hidden",
                ...style
            }}
            {...attributes}
        >
            {children}
        </div>
    );
}