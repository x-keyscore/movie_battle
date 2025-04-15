import type { ReactElement } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type Children = ReactElement<"svg" | "img" | "span">;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: Children | [Children, Children];
    size?: "small" | "medium";
    variant?: "ghost" | "primary" | "secondary";
    className?: string;
    ariaLabel?: string;
    isActive?: boolean;
}

export function Button({
    size = "medium",
    variant = "secondary",
    children,
    className,
    ariaLabel,
    isActive,
    ...props
}: ButtonProps) {
    const variants: Record<typeof variant, string> = {
        ghost: styles.ghost,
        primary: styles.primary,
        secondary: styles.secondary
    };

    const sizes: Record<typeof size, string> = {
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
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
}