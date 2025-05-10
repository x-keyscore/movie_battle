import type { SlidableContextValue, SyncSlide, KillSlide, SlideRegistry, SlideSequence, SlideExchange } from "./types";
import type { ReactNode, ComponentRef, HTMLAttributes } from "react";
import { createContext, useContext, useRef, useEffect, useCallback } from "react";
import { exchangeByIndex, exchangeBySequence } from "./utils";

export const internalSymbol = Symbol("internal");

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
    /**
     * Slide transition duration in milliseconds
     * 
     * **Default:** `500`
     */
    duration?: number;
}

export function Slidable({
    children,
    duration = 500,
    ...attributes
}: SlidableProps) {
    const sectionRef = useRef<ComponentRef<"div">>(null);
    const registryRef = useRef<SlideRegistry>(new Map());
    const sequenceRef = useRef<SlideSequence>([]);
    const exchangeRef = useRef<SlideExchange>({ 
        fromId: null, 
        toId: null
    });

    const syncSlide: SyncSlide = useCallback((id, newState) => {
        const registry = registryRef.current;
        const sequence = sequenceRef.current;
        const exchange = exchangeRef.current;
        const oldState = registry.get(id);

        // FIRST OPEN
        if (!oldState && newState.isOpen) {
            sequence.push(id);
        }
        // UPDATE EXCHANGE
        else if (oldState && oldState.isOpen !== newState.isOpen) {
            if (newState.isOpen) exchange.toId = id;
            else exchange.fromId = id;
        }

        // UPDATE REGISTRY
        registry.set(id, newState);

        if (exchange.fromId && exchange.toId) {
            const { fromId, toId } = exchange;
            const fromSlide = registry.get(fromId)!;
            const toSlide = registry.get(toId)!;

            // PROCESS EXCHANGE
            if (fromSlide.index === null || toSlide.index === null) {
                exchangeBySequence(sequence, exchange, fromSlide, toSlide);
            } else {
                exchangeByIndex(fromSlide, toSlide);
            }

            // UPDATE SEQUENCE
            if (sequence.includes(toId)) {
                sequence.length = sequence.indexOf(toId) + 1;
            } else {
                sequence.push(toId);
            }

            // CLEAN EXCHANGE
            exchange.fromId = null;
            exchange.toId = null;
        }
        console.log(sequence);
    }, []);

    const killSlide: KillSlide = useCallback((id) => {
        const registry = registryRef.current;
        registry.delete(id);

        const sequence = sequenceRef.current;
        const idxInSeq = sequence.indexOf(id);
        if (idxInSeq !== -1) sequence.splice(idxInSeq, 1);

        const exchange = exchangeRef.current;
        if (exchange.fromId === id) exchange.fromId = null;
        if (exchange.toId === id) exchange.toId = null;
    }, []);

    useEffect(() => {
        return () => {
            registryRef.current.clear();
            sequenceRef.current = [];
            exchangeRef.current = { 
                fromId: null, 
                toId: null
            };
        };
    }, []);

    return (
        <SlidableContext.Provider value={{
            [internalSymbol]: {
                config: { duration },
                syncSlide,
                killSlide
            }
        }}>
            <div
                ref={sectionRef}
                style={{
                    position: "relative",
                    marginLeft: "500px"
                }}
                {...attributes}
            >
                {children}
            </div>
        </SlidableContext.Provider>
    );
}