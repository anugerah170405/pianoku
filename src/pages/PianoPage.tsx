import { Pause, Play, Square } from "lucide-react"
import { Piano } from "../components/Piano"
import { useEffect, useRef, useState } from "react"
import SheetPlayer from "../lib/SheetPlayer"
import { startAudio, stopAll } from "../lib/Piano"
import { SheetView } from "../components/SheetView"
import { useSheets } from "../lib/useSheets"
import { DropDown } from "../components/DropDown"
import { IconButton } from "../components/IconButton"

export const PianoPage = () => {
    const { sheets } = useSheets()
    const [selectedSheet, setSelectedSheet] = useState(() => {
        return localStorage.getItem("selectedSheet") ?? sheets[0].id
    })
    const selected = sheets.find((sheet) => sheet.id === selectedSheet)
    const [isPlaying, setIsPlaying] = useState(false)
    const controllerRef = useRef<AbortController | null>(null)
    const [activeNotes, setActiveNotes] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    //pause

    const [isPaused, setIsPaused] = useState(false)
    const pausedAtRef = useRef(0)

    const isActive = isPlaying || isPaused

    const handlePlay = async () => {
        if (!selected || isPlaying) return

        const start = isPaused ? pausedAtRef.current : 0

        try {
            console.log(`Memulai audio... ${selected.title}`)
            await startAudio()
        } catch (e) {
            console.error("Gagal start audio:", e)
            return
        }

        const controller = new AbortController()
        controllerRef.current = controller
        setIsPlaying(true)
        setIsPaused(false)

        try {
            await SheetPlayer(selected.notes, controller.signal, (note, active) => {
                setActiveNotes((prev) => {
                    if (active) {
                        return [...prev, note]
                    } else {
                        return prev.filter((n) => n !== note)
                    }
                })
            }, (index) => setCurrentStep(index), start)
        } catch (e) {
            console.error("Gagal memutar sheet:", e)
        } finally {
            setActiveNotes([]) // pastikan bersih saat selesai/stop
            if (controllerRef.current === controller) {
                controllerRef.current = null
                setIsPlaying(false)
                setIsPaused(false)
                setActiveNotes([])
                setCurrentStep(null)
                stopAll()
            }
        }
    }

    const handleStop = () => {
        controllerRef.current?.abort()
        controllerRef.current = null
        pausedAtRef.current = 0
        setIsPaused(false)
        setIsPlaying(false)
        setActiveNotes([])
        setCurrentStep(null)
        stopAll()
    }

    const handlePause = () => {
        if (!isPlaying) return

        pausedAtRef.current = (currentStep ?? 0) + 1

        controllerRef.current?.abort()
        controllerRef.current = null

        setIsPlaying(false)
        setIsPaused(true)
        setActiveNotes([])

        stopAll()
    }

    // hentikan otomatis kalau pindah halaman
    useEffect(() => {
        return () => {
            controllerRef.current?.abort()
            controllerRef.current = null
            setIsPlaying(false)
            setActiveNotes([])
            setCurrentStep(null)
            stopAll()
        }
    }, [])

    //simpan selected value musik sheet
    useEffect(() => {
        try {
            localStorage.setItem("selectedSheet", selectedSheet)
        } catch {
            /* abaikan jika storage tidak tersedia */
        }
    }, [selectedSheet])
    return (
        <div className="flex flex-col gap-10">

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-4xl font-medium sm:text-5xl">Play Something.</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Tap the keys, use your keyboard, or pick a sheet.
                    </p>
                </div>
                <div className="flex gap-2">
                    <DropDown value={selectedSheet} onChange={setSelectedSheet} options={useSheets().sheets.map((sheet) => ({ value: sheet.id, label: sheet.title }))} disabled={isActive} />
                    {isPlaying ? (
                        <IconButton variant="primary" onClick={handlePause} ariaLabel="Pause">
                            <Pause size={14} fill="currentColor" />
                        </IconButton>
                    ) : (
                        <IconButton variant="primary" onClick={handlePlay} ariaLabel="Play">
                            <Play size={14} fill="currentColor" />
                        </IconButton>
                    )}

                    <IconButton variant="danger" onClick={handleStop} ariaLabel="Resume" disabled={!isActive}>
                        <Square size={14} fill="currentColor" />
                    </IconButton>
                </div>
            </div>
            {selected && currentStep !== null && (
                <SheetView title={selected.title} notes={selected.notes} currentStep={currentStep} />
            )}
            <Piano activeNotes={activeNotes} />

        </div>
    )
}