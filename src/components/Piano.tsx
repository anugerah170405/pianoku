import { PianoKey } from "./PianoKey"

const whiteKeys = [
  "C4", "D4", "E4", "F4", "G4", "A4", "B4",
  "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"
]

const blackKeys = [
  "C#4", "D#4", null, "F#4", "G#4", "A#4", null,
  "C#5", "D#5", null, "F#5", "G#5", "A#5", null
]

type Props = { activeNotes?: string[] }

export function Piano({ activeNotes = [] }: Props) {
  return (
    <div className="rounded-3xl bg-neutral-900/85 p-3">
      <div className="overflow-x-auto overscroll-x-contain rounded-xl">
        <div className="relative flex min-w-180 select-none md:min-w-0">

          {whiteKeys.map((note) => (
            <PianoKey key={note} note={note} active={activeNotes.includes(note)} />
          ))}

          {blackKeys.map((note, index) =>
            note && (
              <PianoKey
                key={note}
                note={note}
                black
                active={activeNotes.includes(note)}
                style={{ left: `${((index + 1) / whiteKeys.length) * 100}%` }}
              />
            )
          )}

        </div>
      </div>
    </div>
  )
}