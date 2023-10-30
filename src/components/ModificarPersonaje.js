import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { Navigate } from "react-router-dom";
import MostrarSerie from "./MostrarSerie";
import MostrarPersonaje from "./MostrarPersonaje";

export default class ModificarPersonaje extends Component {
  selectSerie = React.createRef();
  selectPersonaje = React.createRef();

  state = {
    statusPut: false,
    statusSeries: false,
    statusPersonajes: false,
    series: [],
    personajes: [],
    idPersonaje: 0,
    idSerie: 0,
  };

  modificarPersonaje = (e) => {
    e.preventDefault();
    let request =
      "/api/personajes/" +
      this.selectPersonaje.current.value +
      "/" +
      this.selectSerie.current.value;
    let url = Global.urlApi + request;

    axios.put(url).then((response) => {
      this.setState({
        statusPut: true,
      });
    });
  };

  loadSeries = () => {
    let request = "api/series";
    axios.get(Global.urlApi + request).then((response) => {
      this.setState({
        series: response.data,
        statusSeries: true,
      });
    });
  };

  loadPersonajes = () => {
    let request = "api/personajes";
    axios.get(Global.urlApi + request).then((response) => {
      this.setState({
        personajes: response.data,
        statusPersonajes: true,
      });
    });
  };
  
  cambiarSerie=()=>{
    this.setState({
      idSerie:this.selectSerie.current.value
    })
  }

  cambiarPersonaje=()=>{
    this.setState({
      idPersonaje:this.selectPersonaje.current.value
    })
  }

  componentDidMount = () => {
    this.loadPersonajes();
    this.loadSeries();
  };

  render() {
    return (
      <div>
        {this.state.statusPut && (
          <Navigate to={"/personajes/" + this.selectSerie.current.value} />
        )}
        <h1>Modificar personaje</h1>
        <form onSubmit={this.modificarPersonaje} className="form">
          <label>Selecciona personaje</label>
          <select onChange={this.cambiarPersonaje} className="form-control" ref={this.selectPersonaje}>
            {(this.state.statusPersonajes) &&
              this.state.personajes.map((personaje, index) => {
                return (
                  <option key={index} value={personaje.idPersonaje}>
                    {personaje.nombre}
                  </option>
                );
              })}
          </select>
          <label>Selecciona serie</label>
          <select onChange={this.cambiarSerie} className="form-control" ref={this.selectSerie}>
            {(this.state.statusSeries) &&
              this.state.series.map((serie, index) => {
                return (
                  <option key={index} value={serie.idSerie}>
                    {serie.nombre}
                  </option>
                );
              })}
          </select>
          <button>Guardar Cambios</button>
        </form>
        <div>
        {
            (this.state.idPersonaje!==0) && (
              <MostrarPersonaje idpersonaje={this.state.idPersonaje}/>
            )
          }
        </div>
        <div>
          {
            (this.state.idSerie!==0) && (
              <MostrarSerie idserie={this.state.idSerie}/>
            )
          }
          
        </div>
        
      </div>
    );
  }
}
