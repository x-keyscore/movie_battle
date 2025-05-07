export type HandleAnimation = {
    from?: "LEFT" | "RIGHT";
    to?: "LEFT" | "RIGHT";
} | null;

export type HandleOpen = (animation: HandleAnimation) => void;

export type HandleClose = (animation: HandleAnimation) => void;

export interface Slide {
    id: number;
    isOpen: boolean;
    isGroup: boolean;
    handleOpen: HandleOpen;
    handleClose: HandleClose;
}

export type ObserveSlide = (slide: Slide) => void;

export interface SlidableContextValue {
    internal: {
        config: {
            duration: number;
        },
        observeSlide: ObserveSlide;
    }
}