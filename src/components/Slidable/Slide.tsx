import type { HTMLAttributes, ReactNode, ComponentRef } from "react";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { interpolateNumber } from "../../utils/commons";
import { useSlidable } from "./Slidable";
import { HandleClose, HandleOpen } from "./types";

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
    const { internal: { config, listenSlide } } = useSlidable();
    const slideRef = useRef<ComponentRef<"div">>(null);
    const idRef = useRef(Math.floor(Math.random() * 9000) + 1000);
    const [isRender, setIsRender] = useState(isOpen);

    const handleOpen: HandleOpen = (claim) => {
        if (!slideRef.current) return;
        const rect = slideRef.current.getBoundingClientRect();

        animationFrame(config.duration, (progress) => {
            if (!slideRef.current) return;

            const opacity = interpolateNumber(1, 0, progress, 2);
            const translateX = interpolateNumber(0, rect.height*-1, progress);

            slideRef.current.style.opacity = opacity.toString();
            slideRef.current.style.transform = `translateX(${translateX}px)`;
        });
        //setIsRender(false);
    };

    const handleClose: HandleClose = (claim) => {
        if (!slideRef.current) return;
        const rect = slideRef.current.getBoundingClientRect();

        animationFrame(config.duration, (progress) => {
            if (!slideRef.current) return;

            const opacity = interpolateNumber(1, 0, progress, 2);
            const translateX = interpolateNumber(0, rect.height*-1, progress);

            slideRef.current.style.opacity = opacity.toString();
            slideRef.current.style.transform = `translateX(${translateX}px)`;
        });
        //setIsRender(false);
    };

    useLayoutEffect(() => {
        if (isOpen) {
            const claim = listenSlide({
                id: idRef.current,
                isOpen,
                isGroup,
                handleOpen,
                handleClose
            });

            setIsRender(true);
            animationFrame(config.duration, (progress) => {
                if (!slideRef.current) return;
                const rect = slideRef.current.getBoundingClientRect();

                const opacity = interpolateNumber(0, 1, progress, 2);
                const translateX = interpolateNumber(rect.height, 0, progress);

                slideRef.current.style.opacity = opacity.toString();
                slideRef.current.style.transform = `translateX(${translateX}px)`;
			});
        }
    }, [isOpen, handleOpen]);

    if (!isRender) return (null);
    return (
        <div
            ref={slideRef}
            style={{
                position: "absolute"
            }}
            {...attributes}
        >
            {children}
        </div>
    );
}