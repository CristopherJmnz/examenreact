import React, { Component } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import NuevoPersonaje from "./NuevoPersonaje";
import ModificarPersonaje from "./ModificarPersonaje";
import DetallesSeries from "./DetallesSeries";
import Personajes from "./Personajes";

export default class Router extends Component {
  render() {
    function DetallesSerieElement(){
        let {idserie}=useParams();
        return <DetallesSeries idserie={idserie} />
    }

    function PersonajesElement(){
        let {idserie}=useParams();
        return <Personajes idserie={idserie} />
    }
    return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<NuevoPersonaje />} />
          <Route path="/modificar" element={<ModificarPersonaje />} />
          <Route path="/serie/:idserie" element={<DetallesSerieElement />} />
          <Route path="/personajes/:idserie" element={<PersonajesElement />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
