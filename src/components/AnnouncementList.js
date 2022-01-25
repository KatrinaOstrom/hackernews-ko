import React from 'react'
import Announcement from './Announcement'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
        announcements {
          id
          url
          description
          postedBy {
            name
          }
        }
    }
  }
`;

const getLinksToRender = (data) => {
  return data.feed.announcements;
};

const AnnouncementList = () => {
  const {
    data,
    loading,
    error,
  } = useQuery(FEED_QUERY);


  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(data).map(
            (announcement, index) => (
              <Announcement
                key={announcement.id}
                announcement={announcement}
                index={index}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default AnnouncementList; 