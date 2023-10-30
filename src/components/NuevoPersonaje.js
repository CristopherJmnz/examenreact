import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Global from "../Global";
import axios from "axios";

export default class NuevoPersonaje extends Component {
  nombre = React.createRef();
  imagen = React.createRef();
  selectSerie = React.createRef();

  state = {
    statusPost: false,
    statusGet: false,
    series: [],
  };

  loadSeries = () => {
    let request = "api/series";
    axios.get(Global.urlApi + request).then((response) => {
      this.setState({
        series: response.data,
        statusGet: true,
      });
    });
  };

  createPersonaje = (e) => {
    e.preventDefault();
    let request = "/api/personajes";
    let url = Global.urlApi + request;

    let data = {
      idPersonaje: 0,
      nombre: this.nombre.current.value,
      imagen: this.imagen.current.value,
      idSerie: parseInt(this.selectSerie.current.value),
    };
    axios.post(url, data).then((response) => {
      this.setState({
        statusPost: true,
      });
    });
  };
  componentDidMount = () => {
    this.loadSeries();
  };

  render() {
    return (
      <div className="container">
        <h1>NUEVO PERSONAJE</h1>
        {this.state.statusPost && (
          <Navigate to={"/personajes/" + this.selectSerie.current.value} />
        )}
        <form onSubmit={this.createPersonaje}>
          <label>Nombre</label>
          <input
            className="form-control"
            type="text"
            name="usuario"
            ref={this.nombre}
          />
          <label>Imagen</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            ref={this.imagen}
          />
          <label>Serie</label>
          <select ref={this.selectSerie}>
            {this.state.statusGet &&
              this.state.series.map((serie, index) => {
                return (
                  <option key={index} value={serie.idSerie}>
                    {serie.nombre}
                  </option>
                );
              })}
          </select>
          <button type="submit" className="btn btn-danger mt-4 ">
            Insertar
          </button>
        </form>
      </div>
    );
  }
}
