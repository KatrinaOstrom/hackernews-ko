
import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'


class User extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">

        <div className="flex items-center">
            <span className="gray">{this.props.index + 1}.</span>
        </div>


        <div className="ml1">
            {this.props.user.name}
        </div> 

        &emsp; ID:    

        <div className="ml1">
            {this.props.user.id}
        </div>

      </div>
    )
  }
}

export default User