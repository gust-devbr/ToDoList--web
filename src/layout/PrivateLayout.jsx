import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
    return (
        <>
            <Navbar />
            <main className="pt-20 px-6">
                <Outlet />
            </main>
        </>
    );
};