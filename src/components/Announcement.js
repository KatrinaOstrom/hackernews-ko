
import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'


class Announcement extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">

        <div className="flex items-center">
            <span className="gray">{this.props.index + 1}.</span>
        </div>
        Announcement:

        <div className="ml1">
            {this.props.announcement.description}
        </div> 

        <div className="ml1">
            {this.props.announcement.postedBy}
        </div> 

        <div className="ml1">
            {this.props.announcement.createdAt}
        </div> 



      </div>
    )
  }
}

export default Announcement