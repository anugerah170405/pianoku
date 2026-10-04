import { Pencil, Trash2 } from "lucide-react"
import type { Sheet } from "../lib/Sheets"
import { useState } from "react"
import { Button } from "./Button"

type Props = {
    sheet: Sheet
    onEdit: (sheet: Sheet) => void
    onDelete: (id: string) => void
}

export const SheetCard = ({ sheet, onEdit, onDelete }: Props) => {

    const [onDeleteConfirm, setOnDeleteConfirm] = useState(false)

    const handleDelete = () => {
        onDelete(sheet.id)
    }

    return (
        <li className="group grid gap-3 border-t border-neutral-200 py-3 sm:grid-cols-[1fr_auto] sm:items-center dark:border-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200 rounded-lg p-3">
            <div>
                <h2 className="text-xl font-medium">{sheet.title}</h2>
                <p className="mt-1 text-sm text-neutral-500">{sheet.notes}</p>
            </div>

            <div className="flex gap-2">
                {onDeleteConfirm ? (
                    <>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => setOnDeleteConfirm(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => onEdit(sheet)}
                            aria-label="Edit"
                            className="rounded-full p-2 hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            onClick={() => setOnDeleteConfirm(true)}
                            aria-label="Delete"
                            className="rounded-full p-2 text-red-500 hover:bg-red-500/10"
                        >
                            <Trash2 size={16} />
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}