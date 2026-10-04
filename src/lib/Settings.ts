import { useSyncExternalStore } from "react"

export type Theme = "system" | "light" | "dark"

export const INSTRUMENTS = ["piano", "soft", "organ", "retro"] as const
export type Instrument = (typeof INSTRUMENTS)[number]

// Satu daftar listener untuk semua setting
const listeners = new Set<() => void>()
export const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => { listeners.delete(listener) }
}

// Pembuat setting generik: baca dari localStorage, simpan otomatis, beri tahu listener
function createSetting<T extends string | boolean>(
    key: string,
    fallback: T,
    parse: (raw: string) => T | null,
) {
    let value = fallback

    try {
        const raw = localStorage.getItem(key)
        if (raw !== null) value = parse(raw) ?? fallback
    } catch { /* abaikan */ }

    const get = () => value

    const set = (next: T) => {
        value = next
        try { localStorage.setItem(key, String(next)) } catch { /* abaikan */ }
        listeners.forEach((l) => l())
    }

    const use = () => [useSyncExternalStore(subscribe, get), set] as const

    return { get, set, use }
}

const mute = createSetting("muted", false, (raw) => raw === "true")

const instrument = createSetting<Instrument>("instrument", "piano", (raw) =>
    (INSTRUMENTS as readonly string[]).includes(raw) ? (raw as Instrument) : null,
)

// Mute
export const isMuted = mute.get
export const setMuted = mute.set
export const useMute = () => {
    const [muted, setMuted] = mute.use()
    return { muted, setMuted }
}

// Instrument
export const getInstrument = instrument.get
export const setInstrument = instrument.set
export const useInstrument = () => {
    const [value, setInstrument] = instrument.use()
    return { instrument: value, setInstrument }
}