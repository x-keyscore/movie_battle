import type { ReactElement } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type Children = ReactElement<"svg" | "img" | "span">;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: Children | [Children, Children];
    variant?: 'primary' | 'secondary';
    size?: "small" | "medium";
    className?: string;
    ariaLabel?: string;
}

export function Button({
    variant = "secondary",
    size = "medium",
    children,
    className,
    ariaLabel,
    ...props
}: ButtonProps) {
    const variants: Record<typeof variant, string> = {
        primary: styles.primary,
        secondary: styles.secondary
    };

    const sizes: Record<typeof size, string> = {
        small: styles.small,
        medium: styles.medium
    };

    return (
        <button
            className={clsx(styles.button, variants[variant], sizes[size], className)}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
}