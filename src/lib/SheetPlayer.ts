import { playNote } from "./Piano"
import { noteDictionary } from "./Sheets"

type onNote = (note: string, active: boolean) => void;
type onStep = (index: number) => void

const sleep = (ms: number, signal: AbortSignal) =>
    new Promise<void>((resolve) => {
        if (signal.aborted) return resolve()
        const timer = setTimeout(resolve, ms)
        signal.addEventListener(
            "abort",
            () => {
                clearTimeout(timer)
                resolve()
            },
            { once: true }
        )
    })

const SheetPlayer = async (sheet: string, signal: AbortSignal, onNote: onNote, onStep: onStep, startIndex = 0) => {
    const tokens = sheet.trim().split(/\s+/)

    for (let index = startIndex; index < tokens.length; index++) {
        if (signal.aborted) break

        const token = tokens[index]
        onStep(index)

        if (token === "·") {
            await sleep(300, signal) // jeda tambahan
            continue
        }

        const note = noteDictionary[token]
        if (note) {
            playNote(note)
            onNote(note, true)
        }

        await sleep(250, signal)          // tombol tetap "menyala"
        if (note) onNote(note, false)     // dipanggil juga saat di-abort
        await sleep(50, signal)
    }
}


export default SheetPlayer