
/**
 * Returns closest element matching one of the given attribute-value pairs
 */
export function closestAttributes(
    element: Element | null,
    attributes: {
        name: string;
        value: string;
        split?: boolean;
    }[]
): Element | null {
    while (element) {
        for (const { name, value, split } of attributes) {
            const attr = element.getAttribute(name);

            if (split && attr?.split(" ").includes(value)) {
                return (element);
            }
            else if (attr === value) {
                return (element);
            }
        }
        element = element.parentElement;
    }

    return (null);
}

export function interpolateNumber(from: number, to: number, progress: number, precision = 0): number {
    if (precision) {
        const factor = 10 ** precision;
        return (Math.round((from + (to - from) * progress) * factor) / factor);
    }

    return (Math.round((from + (to - from) * progress)));
}