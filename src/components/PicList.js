import React from 'react'
import Pic from './Pic'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
        pics {
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
  return data.feed.pics;
};

const PicList = () => {
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
            (pic, index) => (
              <Pic
                key={pic.id}
                pic={pic}
                index={index}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default PicList; 