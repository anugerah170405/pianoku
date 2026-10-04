import { NavLink, useLocation } from "react-router-dom"
import { Menu, Music4, PianoIcon, Settings, X } from "lucide-react"
import { useEffect, useState } from "react"

const mainItems = [
    { to: "/piano", label: "Piano", icon: PianoIcon },
    { to: "/sheets", label: "Sheets", icon: Music4 },
]
const settingsItem = { to: "/settings", label: "Settings", icon: Settings }
const mobileItems = [...mainItems, settingsItem]

const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors ${isActive
        ? "bg-ink text-paper dark:bg-white dark:text-ink"
        : "text-neutral-500 hover:text-ink dark:hover:text-white"
    }`

const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 font-serif text-4xl italic tracking-tight transition-colors ${isActive
        ? "text-ink dark:text-white"
        : "text-neutral-400 hover:text-ink dark:hover:text-white"
    }`

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    useEffect(() => {
        if (!open) return

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        window.addEventListener("keydown", onKey)

        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener("keydown", onKey)
        }
    }, [open])

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)")

        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setOpen(false)
            }
        }

        mq.addEventListener("change", onChange)

        return () => mq.removeEventListener("change", onChange)
    }, [])

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-paper dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 bg-auto">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex gap-1 font-serif text-xl font-semibold italic tracking-tight"
                >
                    <PianoIcon size={24} />
                    <span>Pianoku</span>
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden gap-1 md:flex">
                    {mainItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={desktopLink}
                        >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                        </NavLink>
                    )).filter((_, index) => index < 2)}
                </nav>

                <div aria-label="Settings" className="hidden md:flex">
                    <NavLink to={settingsItem.to} className={desktopLink}>
                        <settingsItem.icon size={16} />
                        <span>{settingsItem.label}</span>
                    </NavLink>
                </div>



                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="relative md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 -z-10 bg-paper transition-all duration-300 dark:bg-ink ${open
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0"
                    }`}
            >
                <nav className="flex flex-col gap-8 px-5 pt-32">
                    {mobileItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={mobileLink}
                        >
                            <item.icon size={32} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}