import type { ReactElement } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type Children = ReactElement<"svg" | "img" | "span">;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: Children | [Children, Children];
    size?: "mini" | "small" | "medium";
    variant?: "ghost" | "normal";
    isActive?: boolean;
}

export function Button({
    children,
    className,
    isActive,
    size = "medium",
    variant = "normal",
    ...attributes
}: ButtonProps) {
    const variants: Record<typeof variant, string> = {
        ghost: styles.ghost,
        normal: styles.normal
    };

    const sizes: Record<typeof size, string> = {
        mini: styles.mini,
        small: styles.small,
        medium: styles.medium
    };

    return (
        <button
            type="button"
            className={clsx(
                className,
                styles.button,
                sizes[size],
                variants[variant],
                isActive && styles.active
            )}
            {...attributes}
        >
            {children}
        </button>
    );
}