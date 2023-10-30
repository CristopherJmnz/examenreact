import React, { Component } from 'react'
import imgHome from './../assets/img/home.jpg'

export default class Home extends Component {
  render() {
    return (
      <div>
        <img src={imgHome} alt='' style={{
          height:"500px",
          width:"800px"
        }}/>
      </div>
    )
  }
}
