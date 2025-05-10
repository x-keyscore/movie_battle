
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