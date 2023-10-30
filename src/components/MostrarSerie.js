import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class MostrarSerie extends Component {
  state = {
    status: false,
    serie: null,
  };

  findSerie = () => {
    let request = "api/series/" + this.props.idserie;
    axios.get(Global.urlApi + request).then((response) => {
        console.log(response.data)
      this.setState({
        status: true,
        serie: response.data,
      });
    });
  };
  componentDidMount=()=>{
    this.findSerie();
  }

  componentDidUpdate=(oldprops)=>{
    if (oldprops.idserie!=this.props.idserie) {
        this.findSerie();
    }
  }

  render() {
    return (
      <div>
        {(this.state.status) && (
          <div>
            <h1>{this.state.serie.nombre}</h1>
            <img style={{
                    height:"200px",
                    width:"200px"
                }} src={this.state.serie.imagen} alt="" />
          </div>
        )}
      </div>
    );
  }
}
