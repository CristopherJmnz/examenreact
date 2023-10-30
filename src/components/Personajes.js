import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {

    state = {
        personajes: [],
        status: false,
      };
    
      loadPersonajes = () => {
        let request = "api/series/personajesSerie/" + this.props.idserie;
        axios.get(Global.urlApi + request).then((response) => {
          this.setState({
            personajes: response.data,
            status: true,
          });
        });
      };
    
      componentDidMount = () => {
        this.loadPersonajes();
      };

  render() {
    return (
      <div>
        <NavLink className='btn btn-warning mt-3' to={"/serie/" + this.props.idserie}>Volver</NavLink>
        <div className='container d-flex flex-row flex-wrap'>
        
                {
                    (this.state.status) && (
                        this.state.personajes.map((personaje, index) => {
                            return (
                                <div className='d-flex flex-column m-5 text-center w-25' key={index}>
                                    <h2>{personaje.nombre}</h2>
                                    <h3>{personaje.posicion}</h3>
                                    <img
                                    className='img-fluid mx-auto d-block'
                                        style={{
                                            height: "150px",
                                            width: "100px"
                                        }}
                                        src={personaje.imagen}
                                        alt={personaje.nombre} />
                                    
                                </div>
                            )
                        })
                    )
                }
            </div>
      </div>
    )
  }
}
