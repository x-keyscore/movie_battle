import type { ReactElement } from "react";
import styles from "./Button.module.css";

type Children = ReactElement<"svg" | "img" | "span">;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: Children | [Children, Children];
    variant?: 'primary' | 'secondary';
    className?: string;
    ariaLabel?: string;
}

export function Button({
    variant = "secondary",
    children,
    className,
    ariaLabel,
    ...props
}: ButtonProps) {
    const variants: Record<typeof variant, string> = {
        primary: "",
        secondary: ""
    };

    return (
        <button
            className={styles.button + " " + variants[variant] + " " + className}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
}