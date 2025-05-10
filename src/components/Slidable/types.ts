import { internalSymbol } from "./Slidable";

export interface DirectiveTransition {
    from?: "LEFT" | "RIGHT";
    to?: "LEFT" | "RIGHT";
};

export interface Directive {
    transition?: DirectiveTransition;
    render: boolean;
};

export type DirectiveEvent = (directive: Directive) => void;

export interface SlideState {
    index: number | null;
    isOpen: boolean;
    isGroup: boolean;
    isRender: boolean;
    applyDirective: DirectiveEvent;
}

export type SyncSlide = (id: number, state: SlideState) => void;
export type KillSlide = (id: number) => void;

export interface SlidableContextValue {
    [internalSymbol]: {
        config: {
            duration: number;
        },
        syncSlide: SyncSlide;
        killSlide: KillSlide;
    }
}

export type SlideRegistry = Map<number, SlideState>;

export type SlideSequence = number[];

export interface SlideExchange {
    fromId: number | null;
    toId: number | null;
}
