import { BrowserRouter, Routes, Route } from "react-router-dom"; // use react-router-dom, não "react-router"
import { Initial } from "../pages/Initial";
import { Home } from "../pages/Home";
import {Historico} from "../pages/Historico" ;


export function Routas() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Initial />}>
          <Route index element={<Home />} />
            <Route path='historico' element={<Historico />} />
          
        </Route>
            </Routes>
        </BrowserRouter>
    );
}

