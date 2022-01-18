import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './AnnouncementList'
import { ANNOUNCEMENTS_PER_PAGE } from '../constants'
const POST_ANNOUNCEMENT_MUTATION = gql`
  mutation PostAnnouncementMutation($description: String!) {
    postAnnouncement(description: $description) {
      description
    }
  }
`

class CreateAnnouncement extends Component {
  state = {
    description: ''

  }

  render() {
    const { description } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the announcement"
          />
          

        </div>

        <Mutation
  mutation={POST_ANNOUNCEMENT_MUTATION}
  variables={{ description}}
  onCompleted={() => this.props.history.push('/new/1')}
  update={(store, { data: { postAnnouncement } }) => {
    const first = ANNOUNCEMENTS_PER_PAGE
    const skip = 0
    const orderBy = 'createdAt_DESC'
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    })
    data.feed.announcements.unshift(postAnnouncement)
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: { first, skip, orderBy }
    })
  }}
>
  {postAnnouncementMutation => <button onClick={postAnnouncementMutation}>Submit</button>}
</Mutation>


      </div>
    )
  }
}

export default CreateAnnouncement