import { useEffect, useState } from "react"
import { sheets as initialSheets, type Sheet } from "./Sheets"

const STORAGE_KEY = "sheets"

export type SheetInput = Omit<Sheet, "id">

export const useSheets = () => {
    // READ: ambil dari localStorage, fallback ke data awal
    const [sheets, setSheets] = useState<Sheet[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            return raw ? (JSON.parse(raw) as Sheet[]) : initialSheets
        } catch {
            return initialSheets
        }
    })

    // Simpan otomatis setiap ada perubahan
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets))
        } catch {
            /* abaikan jika storage penuh / tidak tersedia */
        }
    }, [sheets])

    // CREATE
    const createSheet = (data: SheetInput) =>
        setSheets((prev) => [...prev, { id: crypto.randomUUID(), ...data }])

    // UPDATE
    const updateSheet = (id: string, data: SheetInput) =>
        setSheets((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))

    // DELETE
    const deleteSheet = (id: string) =>
        setSheets((prev) => prev.filter((s) => s.id !== id))

    return { sheets, createSheet, updateSheet, deleteSheet }
}