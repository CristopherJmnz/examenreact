import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Global from "../Global";
import axios from "axios";
import logo from "./../assets/img/logo.png";

export default class Menu extends Component {
  state = {
    series: [],
    status: false,
  };

  loadSeries = () => {
    let request = "api/series";
    axios.get(Global.urlApi + request).then((response) => {
      this.setState({
        series: response.data,
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadSeries();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src={logo}
              alt=""
              width="120"
              height="96"
              className="d-inline-block align-text-top m-2"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/create">
                Nuevo Personaje
              </NavLink>
              <NavLink className="nav-link" to="/modificar">
                Modificar Personaje
              </NavLink>
              <div className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Series
                </NavLink>
                <div className="dropdown-menu">
                  {this.state.status &&
                    this.state.series.map((serie, index) => {
                      return (
                        <NavLink
                          className="dropdown-item"
                          key={serie.idSerie}
                          to={"/serie/" + serie.idSerie}
                        >
                          {serie.nombre}
                        </NavLink>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
