export interface Slide {
    id: number;
    isOpen: boolean;
    isGroup: boolean;
    handleOpen: HandleOpen;
    handleClose: HandleClose;
}

type HandleClaim = {
    from: "LEFT" | "RIGHT" | "CENTER";
    to: "LEFT" | "RIGHT" | "CENTER";
} | null;

export type ListenSlide = (slide: Slide) => void;

export type HandleOpen = (claim: HandleClaim) => void;

export type HandleClose = (claim: HandleClaim) => void;

export interface SlidableContextValue {
    internal: {
        config: {
            duration: number;
        },
        listenSlide: ListenSlide;
    }
}