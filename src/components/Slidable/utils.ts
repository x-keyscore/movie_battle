import { SlideExchange, SlideSequence, SlideState } from "./types";

export function exchangeByIndex(
    fromSlide: SlideState,
    toSlide: SlideState
) {
    if (fromSlide.index === null) throw new Error("fromSlide.index is null");
    if (toSlide.index === null) throw new Error("toSlide.index is null");

    if (fromSlide.index > toSlide.index) {
        fromSlide.applyDirective({
            transition: { to: "RIGHT" },
            render: false
        });
        toSlide.applyDirective({
            transition: { from: "LEFT" },
            render: true
        });
    } else {
        fromSlide.applyDirective({
            transition: { to: "LEFT" },
            render: false
        });
        toSlide.applyDirective({
            transition: { from: "RIGHT" },
            render: true
        });
    }
}

export function exchangeBySequence(
    sequence: SlideSequence,
    { toId }: SlideExchange,
    fromSlide: SlideState,
    toSlide: SlideState
) {
    if (!toId) throw new Error("toId is null");

    if (sequence.includes(toId)) {
        fromSlide.applyDirective({
            transition: { to: "RIGHT" },
            render: false
        });
        toSlide.applyDirective({
            transition: { from: "LEFT" },
            render: true
        });
    } else {
        fromSlide.applyDirective({
            transition: { to: "LEFT" },
            render: false
        });
        toSlide.applyDirective({
            transition: { from: "RIGHT" },
            render: true
        });
    }
}