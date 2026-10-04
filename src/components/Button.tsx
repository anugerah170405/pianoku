type Props = {
    type?: "submit" | "button"
    variant?: "primary" | "secondary" | "danger"
    children?: React.ReactNode
    onClick?: () => void
}

export const Button = ({
    type = "button",
    variant = "secondary",
    children,
    onClick,
}: Props) => {
    return (
        <button
            type={type}
            className={`
                flex items-center gap-2
                rounded-full px-5 py-2.5
                text-sm font-medium
                disabled:opacity-30
                hover:scale-105 active:scale-95
                transition-all cursor-pointer
                ${
                    variant === "primary"
                        ? "bg-ink text-paper dark:bg-white dark:text-ink"
                        : variant === "danger"
                            ? "bg-red-200/60 text-red-500 hover:bg-red-300/70 dark:bg-red-900/60 dark:text-red-400 dark:hover:bg-red-800/70"
                            : "bg-neutral-200 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"
                }
            `}
            onClick={onClick}
        >
            {children}
        </button>
    )
}