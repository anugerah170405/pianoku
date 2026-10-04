import * as Tone from "tone"
import { getInstrument, isMuted, subscribe, type Instrument } from "./Settings"

const synth = new Tone.PolySynth(Tone.Synth).toDestination()

type SynthPreset = Parameters<typeof synth.set>[0]

const PRESETS: Record<Instrument, SynthPreset> = {
    piano: {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.005, decay: 0.3, sustain: 0.15, release: 1 },
    },
    soft: {
        oscillator: { type: "sine" },
        envelope: { attack: 0.03, decay: 0.2, sustain: 0.5, release: 1.2 },
    },
    organ: {
        oscillator: { type: "square" },
        envelope: { attack: 0.01, decay: 0.05, sustain: 0.9, release: 0.1 },
    },
    retro: {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.002, decay: 0.15, sustain: 0.1, release: 0.3 },
    },
}


// set instrument saat ini
let currentInstrument = getInstrument()
console.log(currentInstrument)
synth.set(PRESETS[currentInstrument])


const applyInstrument = () => {
    // ganti suara hanya kalau instrumen benar-benar berubah
    const next = getInstrument()
    if (next !== currentInstrument) {
        currentInstrument = next
        synth.releaseAll()
        synth.set(PRESETS[next])
    }
}

const applyMute = () => {
    const muted = isMuted()
    Tone.getDestination().mute = muted
    if (muted) synth.releaseAll()
}

const applySettings = () => {
    applyMute()
    applyInstrument()
}

subscribe(applySettings) //simpan pengaturan denga listener

export const startAudio = async () => {
    await Tone.start()
}

export const playNote = (note: string) => {
    if (isMuted()) return
    synth.triggerAttackRelease(note, "8n")
}

export const stopAll = () => {
    synth.releaseAll()
}