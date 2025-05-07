import type { HTMLAttributes, ReactNode, ComponentRef } from "react";
import type { HandleAnimation, HandleClose, HandleOpen } from "./types";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { interpolateNumber } from "../../utils/commons";
import { useSlidable } from "./Slidable";

function createId() {
    return (Math.floor(Math.random() * 9000) + 1000);
}

interface SlideProps extends Omit<HTMLAttributes<HTMLDivElement>, "ref" | "style"> {
    children: ReactNode;
    isOpen: boolean;
    isGroup?: boolean;
}

export function Slide({
    children,
    isOpen,
    isGroup = false,
    ...attributes
}: SlideProps) {
    const animationFrame = useAnimationFrame();
    const { internal: { config, observeSlide } } = useSlidable();
    const timeoutRef = useRef<number | undefined>(undefined);
    const slideRef = useRef<ComponentRef<"div">>(null);
    const idRef = useRef(createId());
    const [isRender, setIsRender] = useState(isOpen);

    const animationlaunch = (claim: HandleAnimation) => {
        let rect: DOMRect | undefined = undefined;

        if (claim?.from) {
            const from = claim.from;

            animationFrame(config.duration, (progress) => {
                rect = rect ?? slideRef.current?.getBoundingClientRect();
                if (!slideRef.current || !rect) return;

                const opacity = interpolateNumber(0, 1, progress, 2);
                const delta = from === "LEFT" ? rect.height*-1 : rect.height;
                const translateX = interpolateNumber(delta, 0, progress);

                slideRef.current.style.opacity = opacity.toString();
                slideRef.current.style.transform = `translateX(${translateX}px)`;
            });
        } else if (claim?.to) {
            const to = claim.to;

            animationFrame(config.duration, (progress) => {
                rect = rect ?? slideRef.current?.getBoundingClientRect();
                if (!slideRef.current || !rect) return;
                
                const opacity = interpolateNumber(1, 0, progress, 2);
                const delta = to === "LEFT" ? rect.height*-1 : rect.height;
                const translateX = interpolateNumber(0, delta, progress);
    
                slideRef.current.style.opacity = opacity.toString();
                slideRef.current.style.transform = `translateX(${translateX}px)`;
            });
        }
    }

    const handleOpen: HandleOpen = (claim) => {
        setIsRender(true);
        if (!claim) return;
        animationlaunch(claim);
    };

    const handleClose: HandleClose = (claim) => {
        animationlaunch(claim);
        timeoutRef.current = setTimeout(() => {
            setIsRender(false);
        }, config.duration);
    };

    useEffect(() => {
        () => clearTimeout(timeoutRef.current);
    }, []);

    useLayoutEffect(() => {
        observeSlide({
            id: idRef.current,
            isOpen,
            isGroup,
            handleOpen: handleOpen,
            handleClose: handleClose,
        });
    }, [isOpen, isGroup]);

    if (!isRender) return (null);
    return (
        <div
            ref={slideRef}
            style={{
                position: isGroup ? "relative" : "absolute"
            }}
            {...attributes}
        >
            {children}
        </div>
    );
}