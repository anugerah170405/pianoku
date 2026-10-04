import { PianoIcon } from "lucide-react"
import { FaLinkedin, FaGithub } from "react-icons/fa6"

const socials = [
    { href: "https://youtube.com", label: "Linkedin", icon: FaLinkedin },
    { href: "https://github.com", label: "GitHub", icon: FaGithub },
]

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">

                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 font-serif text-xl font-semibold italic tracking-tight">
                        <PianoIcon size={24} />
                        <span>Pianoku</span>
                    </div>
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} Pianoku. All rights reserved.
                    </p>
                </div>

                {/* Social media */}
                <ul className="flex gap-1">
                    {socials.map(({ href, label, icon: Icon }) => (
                        <li key={label}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                                className="flex size-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-ink dark:hover:text-white"
                            >
                                <Icon size={18} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
