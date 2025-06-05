import { BrowserRouter, Routes, Route } from "react-router-dom"; // use react-router-dom, não "react-router"
import { Initial } from "../pages/Initial";
import { Home } from "../pages/Home";
import {Historico} from "../pages/Historico" ;
import { Login } from "../pages/Login";
import { SensorTemperatura } from "../pages/SensorTemperatura";
import { SensorUmidade } from "../pages/SensorUmidade";
import { SensorLuminosidade } from "../pages/SensorLuminosidade";

export function Routas() {
    return (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/initial" element={<Initial />}>
        <Route index element={<Home />} />
        <Route path="historico" element={<Historico />} />
        <Route path = "temperatura" element = {<SensorTemperatura/>}/>
        <Route path = "Umidade" element = {<SensorUmidade/>}/>
        <Route path = "Iluminacao" element = {<SensorLuminosidade/>}/>
      </Route>
    </Routes>
    );
}

