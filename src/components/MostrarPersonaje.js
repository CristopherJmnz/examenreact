import React, { Component } from 'react'
import axios from "axios";
import Global from "../Global";

export default class MostrarPersonaje extends Component {
    state = {
        status: false,
        personaje: null,
      };
    
      findPersonaje = () => {
        let request = "api/personajes/" + this.props.idpersonaje;
        axios.get(Global.urlApi + request).then((response) => {
          this.setState({
            status: true,
            personaje: response.data,
          });
        });
      };
      componentDidMount=()=>{
        this.findPersonaje();
      }
    
      componentDidUpdate=(oldprops)=>{
        if (oldprops.idpersonaje!=this.props.idpersonaje) {
            this.findPersonaje();
        }
      }
    
      render() {
        return (
          <div>
            {(this.state.status) && (
              <div>
                <h1>{this.state.personaje.nombre}</h1>
                <img style={{
                    height:"200px",
                    width:"200px"
                }} src={this.state.personaje.imagen} alt="" />
              </div>
            )}
          </div>
        );
      }
}
