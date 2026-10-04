import { useState } from "react"
import { noteDictionary, type Sheet } from "../lib/Sheets"
import type { SheetInput } from "../lib/useSheets"
import { Button } from "./Button"

type Props = {
    initial?: Sheet
    onSubmit: (data: SheetInput) => void
    onCancel: () => void
}

const findInvalidNotes = (notes: string) =>
    notes
        .split(/\s+/)
        .filter((t) => t && t !== ".")
        .filter((t) => !(t in noteDictionary))

export const SheetForm = ({ initial, onSubmit, onCancel }: Props) => {
    const [title, setTitle] = useState(initial?.title ?? "")
    const [notes, setNotes] = useState(initial?.notes ?? "")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !notes.trim()) {
            setError("Title and notes cannot be empty.")
            return
        }
        const invalid = findInvalidNotes(notes)
        if (invalid.length > 0) {
            setError(`Invalid notes: ${invalid.join(", ")}`)
            return
        }

        onSubmit({ title: title.trim(), notes: notes.trim() })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-3 rounded-lg p-4"
        >
            <h2 className="text-xl font-medium">
                {initial ? "Edit Sheet" : "Create New Sheet"}
            </h2>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your sheet title"
                className="w-full rounded-lg bg-neutral-200/60 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-900"
            />

            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: 1 1 5 5 6 6 5 · 4 4 3 3 2 2 1"
                rows={4}
                className="w-full rounded-lg bg-neutral-200/60 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-neutral-900"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
                <Button type="submit" variant="primary">
                    {initial ? "Save Chages" : "Save"}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}