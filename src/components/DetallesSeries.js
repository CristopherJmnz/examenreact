import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { NavLink } from "react-router-dom";

export default class DetallesSeries extends Component {
  state = {
    serie: null,
    status: false,
  };

  findSerie = () => {
    let request = "api/series/" + this.props.idserie;
    axios.get(Global.urlApi + request).then((response) => {
      this.setState({
        serie: response.data,
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.findSerie();
  };

  componentDidUpdate = (oldprops) => {
    if (oldprops.idserie!=this.props.idserie) {
        this.findSerie();
    }
  };
  render() {
    return (
      <div>
        {this.state.status && (
          <div>
            <h1>{this.state.serie.nombre}</h1>
            <img style={{
              width:"300px"
            }} src={this.state.serie.imagen} alt=""/>
            <p>Puntuacion: {this.state.serie.puntuacion}</p>
            <NavLink className='btn btn-success' to={"/personajes/" + this.state.serie.idSerie}>Personajes</NavLink>
          </div>
        )}
      </div>
    );
  }
}
