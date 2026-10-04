import { useState } from "react"
import { ListMusicIcon, Plus, Search } from "lucide-react"
import { SheetCard } from "../components/SheetCard"
import { SheetForm } from "../components/SheetForm"
import type { Sheet } from "../lib/Sheets"
import { useSheets } from "../lib/useSheets"
import { IconButton } from "../components/IconButton"

// null = form tertutup, "new" = mode create, Sheet = mode edit
type FormState = null | "new" | Sheet

export const SheetsPage = () => {
    const { sheets, createSheet, updateSheet, deleteSheet } = useSheets()
    const [form, setForm] = useState<FormState>(null)
    const [query, setQuery] = useState("")

    const filteredSheets = sheets.filter((sheet) =>
        sheet.title.toLowerCase().includes(query.toLowerCase())
    )


    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-4xl font-medium sm:text-5xl">My Sheets</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Here you can find or create your sheets.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="relative max-w-xs">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                        />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search sheets..."
                            className="w-full rounded-full bg-neutral-200/60 py-2 pl-9 pr-4 text-sm outline-none transition focus:bg-neutral-200 dark:bg-neutral-800/60 dark:focus:bg-neutral-800"
                        />
                    </div>
                    <IconButton ariaLabel="Create New Sheet" variant="primary" onClick={() => setForm("new")}>
                        <Plus size={14} fill="currentColor" />
                    </IconButton>
                </div>
            </div>

            {form && (
                <SheetForm
                    key={form === "new" ? "new" : form.id}
                    initial={form === "new" ? undefined : form}
                    onCancel={() => setForm(null)}
                    onSubmit={(data) => {
                        if (form === "new") createSheet(data)
                        else updateSheet(form.id, data)
                        setForm(null)
                    }}
                />
            )}

            <div className="mt-10">
                {filteredSheets.length === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                        <span>
                            <ListMusicIcon />
                        </span>
                        <p className="text-sm text-neutral-500">There is no music yet.</p>
                    </div>
                ) : (
                    <ul>
                        {filteredSheets.map((sheet) => (
                            <SheetCard
                                key={sheet.id}
                                sheet={sheet}
                                onEdit={setForm}
                                onDelete={deleteSheet}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}