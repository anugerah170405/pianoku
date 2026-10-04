import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { PianoPage } from "./pages/PianoPage";
import {SheetsPage} from "./pages/SheetsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import Footer from "./components/Footer";

function root() {
    const { pathname } = useLocation()
    return (
        <div className="flex flex-col min-h-screen gap-4">
            <Navbar />
            <main key={pathname} className="mx-auto w-full max-w-4xl flex-1 pt-28 px-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export const router = createBrowserRouter(
    [{
        path: "/",
        Component: root,
        children: [
            { index: true, element: <Navigate to="/piano" replace /> },
            { path: "piano", Component: PianoPage },
            { path: "sheets", Component: SheetsPage },
            { path: "settings", Component: SettingsPage },
            { path: "*", element: <NotFoundPage /> },
        ]
    }]
)