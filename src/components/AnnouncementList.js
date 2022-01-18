import React from 'react'
import Announcement from './Announcement'
import { useQuery } from 'react-apollo'
import { useHistory } from 'react-router';
import gql from 'graphql-tag'
import { ANNOUNCEMENTS_PER_PAGE } from '../constants';
export const FEED_QUERY = gql`
  query FeedQuery(
    $take: Int
    $skip: Int
    $orderBy: LinkOrderByInput
  ) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
        announcements{
            description
            id
            createdAt
            
        }
    }
  }
`;

/* to get the data on announcements: 
  {
    feed{
    	announcements{
      	description
      	
    	}
  	}
  }
  
*/

const getLinksToRender = (data) => {
    return data.feed.announcements;
  }

const getQueryVariables = (isNewPage, page) => {
  const skip = isNewPage ? (page - 1) * ANNOUNCEMENTS_PER_PAGE : 0;
  const take = isNewPage ? ANNOUNCEMENTS_PER_PAGE : 100;
  const orderBy = { createdAt: 'desc' };
  return { take, skip, orderBy };
};

const AnnouncementList = () => {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes(
    'new'
  );
  const pageIndexParams = history.location.pathname.split(
    '/'
  );
  const page = parseInt(
    pageIndexParams[pageIndexParams.length - 1]
  );

  const pageIndex = page ? (page - 1) * ANNOUNCEMENTS_PER_PAGE : 0;

  const {
    data,
    loading,
    error,
  } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page)
  });


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
                index={index + pageIndex}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default AnnouncementList;


// to make changes: database in schema.prisma, then GraphQl in schema.graphQL, schema.prisma!!!!!! then LinkList.js, then restart the 4000