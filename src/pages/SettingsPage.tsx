import { DropDown } from "../components/DropDown"
import { useTheme } from "next-themes"
import { INSTRUMENTS, useInstrument, useMute, type Instrument, type Theme } from "../lib/Settings"

const THEME_OPTIONS: { value: Theme; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
]

const INSTRUMENT_OPTIONS = INSTRUMENTS.map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
}))

export const SettingsPage = () => {
    const { theme = "system", setTheme } = useTheme()
    const { muted, setMuted } = useMute()
    const { instrument, setInstrument } = useInstrument()

    return (
        <div className="flex flex-col gap-10">

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-4xl font-medium sm:text-5xl">Settings</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Configure your preferences and settings for the application.
                    </p>
                </div>

            </div>

            <section className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-medium" id="theme-label">Themes</h2>
                    <p className="text-sm text-neutral-500">Choose the appearance of the application.</p>
                </div>

                <DropDown
                    value={theme}
                    onChange={(value) => setTheme(value as Theme)}
                    options={THEME_OPTIONS}
                    aria-labelledby="theme-label"
                />
            </section>

            <section className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-medium" id="theme-label">Instruments</h2>
                    <p className="text-sm text-neutral-500">Choose </p>
                </div>

                <DropDown
                    value={instrument}
                    onChange={(value) => setInstrument(value as Instrument)}
                    options={INSTRUMENT_OPTIONS}
                    aria-labelledby="theme-label"
                />
            </section>

            <section className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-medium" id="mute-label">Mute sound</h2>
                    <p className="text-sm text-neutral-500" id="mute-desc">
                        Turn off all the sound
                    </p>
                </div>

                <button
                    type="button"
                    role="switch"
                    aria-checked={muted}
                    aria-labelledby="mute-label"
                    aria-describedby="mute-desc"
                    onClick={() => setMuted(!muted)}
                    className={[
                        "relative h-7 w-11 shrink-0 rounded-full transition-colors",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500",
                        muted ? "bg-neutral-900 dark:bg-neutral-100" : "bg-neutral-300 dark:bg-neutral-700",
                    ].join(" ")}
                >
                    <span
                        className={[
                            "absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform dark:bg-neutral-900",
                            muted ? "translate-x-4" : "translate-x-0",
                        ].join(" ")}
                    />
                </button>
            </section>

        </div>
    )
}
