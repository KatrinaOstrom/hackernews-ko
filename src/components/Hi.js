import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'

const name = 'Katrina';

class Hi extends Component {
  render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return(
        <h1 className="Hello"> my name is {name} </h1>
    )
  }
}

export default Hi