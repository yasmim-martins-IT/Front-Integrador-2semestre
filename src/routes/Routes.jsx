import { BrowserRouter, Routes, Route } from "react-router-dom"; // use react-router-dom, não "react-router"
import { Initial } from "../pages/Initial";
import { Home } from "../pages/Home";
import {Historico} from "../pages/Historico" ;
import { Login } from "../pages/Login";


export function Routas() {
    return (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/initial" element={<Initial />}>
        <Route index element={<Home />} />
        <Route path="historico" element={<Historico />} />
      </Route>
    </Routes>
    );
}

