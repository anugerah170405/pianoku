type Props = {
    type?: "submit" | "button"
    variant?: "primary" | "secondary" | "danger"
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    ariaLabel: string
}

export const IconButton = ({
    type = "button",
    variant = "secondary",
    children,
    onClick,
    disabled = false,
    ariaLabel,
}: Props) => {
    return (
        <button
            type={type}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={onClick}
            className={`
                flex h-10 w-10 items-center justify-center
                rounded-full
                transition-all
                cursor-pointer
                disabled:cursor-not-allowed disabled:opacity-30
                hover:scale-105 active:scale-95
                ${
                    variant === "primary"
                        ? "bg-ink text-paper dark:bg-white dark:text-ink"
                        : variant === "danger"
                            ? "bg-red-200/60 text-red-500 hover:bg-red-300/70 dark:bg-red-900/60 dark:text-red-400 dark:hover:bg-red-800/70"
                            : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
                }
            `}
        >
            {children}
        </button>
    )
}