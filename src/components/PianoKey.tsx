import { playNote } from "../lib/Piano"

type Props = {
  note: string
  black?: boolean
  style?: React.CSSProperties
  active?: boolean
}

export function PianoKey({ note, black = false, active = false, style }: Props) {
  return (
    <button
      onPointerDown={() => playNote(note)}
      style={style}
      className={
        black
          ? `
            absolute top-0 z-10
            h-40 w-[6%]
            -translate-x-1/2
            rounded-b-xl
            shadow
            active:translate-y-0.5
            transition-all
            ${active ? "bg-amber-500 translate-y-0.5" : "bg-black hover:bg-neutral-900 active:bg-neutral-700"}
          `
          : `
            relative h-64 flex-1
            border-r border-neutral-200
            active:translate-y-0.5
            transition-all
            rounded-b-xl
            ${active ? "bg-amber-300 translate-y-0.5" : "bg-white hover:bg-neutral-50 active:bg-neutral-200"}
          `
      }
    >
      {!black && (
        <span className="absolute bottom-6 inset-x-0 text-sm text-neutral-400">
          {note}
        </span>
      )}
    </button>
  )
}