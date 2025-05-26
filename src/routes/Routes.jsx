import { BrowserRouter, Routes, Route } from "react-router-dom"; // use react-router-dom, não "react-router"
import { Initial } from "../pages/Initial";

export function Routas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Initial/>} />
            </Routes>
        </BrowserRouter>
    );
}

