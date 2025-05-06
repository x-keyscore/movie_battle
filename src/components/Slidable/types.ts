export interface Slide {
    id: number;
    isGroup: boolean;
    close: () => {};
}

type HandleSlideResult = {
    isIgnore: true;
    without: null;
} | {
    isIgnore: false;
    without: "LEFT" | "RIGHT" | "TOP" | "BOTTOM";
};

export type HandleSlideOpen = (slide: Slide) => HandleSlideResult;

export interface SlidableContextValue {
    internal: {
        config: {
            duration: number;
        },
        handleSlideOpen: HandleSlideOpen;
    }
}