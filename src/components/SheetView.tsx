type Props = {
  title: string
  notes: string
  currentStep: number | null
}

export function SheetView({ title, notes, currentStep }: Props) {
  // harus sama dengan cara SheetPlayer memecah token supaya index-nya cocok
  const tokens = notes.trim().split(/\s+/)

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
        Playing —{" "}
        <span className="font-serif italic tracking-normal text-neutral-900 dark:text-neutral-100">
          {title}
        </span>
      </p>

      <div className="mt-4 flex flex-wrap gap-y-2 text-lg">
        {tokens.map((token, i) => {
          const isCurrent = i === currentStep
          const isPlayed = currentStep !== null && i < currentStep

          return (
            <span
              key={i}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 ${
                isCurrent
                  ? "scale-110 bg-neutral-900 text-white dark:bg-white dark:text-black"
                  : isPlayed
                  ? "text-neutral-400"
                  : "text-neutral-900 dark:text-neutral-100"
              }`}
            >
              {token}
            </span>
          )
        })}
      </div>
    </div>
  )
}