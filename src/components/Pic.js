import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'


class Pic extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">


        <div className="flex items-center"><span className="gray">{this.props.index + 1}.</span></div>
        <div className="ml1"><div>{this.props.pic.description}</div><div className="f6 lh-copy gray">{this.props.pic.postedBy.name}</div></div>
      </div>

      

    )
  }
}

export default Pic 