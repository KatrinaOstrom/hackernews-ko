// new page with LinkList code
// goes to LinkTwo.js instead of Link.js
import React from 'react'
import LinkTwo from './LinkTwo'
import { useQuery } from 'react-apollo'
import { useHistory } from 'react-router';
import gql from 'graphql-tag'
import { LINKS_PER_PAGE } from '../constants';

export const FEED_QUERY = gql`
  query FeedQuery(
    $take: Int
    $skip: Int
    $orderBy: LinkOrderByInput
  ) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        url
        tag
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
            name
          }
        }
        createdAt
      }
      count
    }
  }
`;

const getLinksToRender = (isNewPage, data) => {
  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort(
    (l1, l2) => l2.votes.length - l1.votes.length
  );
  return rankedLinks;
};

const getQueryVariables = (isNewPage, page) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: 'desc' };
  return { take, skip, orderBy };
};

const Hi = () => {
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

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

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
          {getLinksToRender(isNewPage, data).map(
            (link, index) => (
              <LinkTwo
                key={link.id}
                link={link}
                index={index + pageIndex}
              />
            )
          )}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    history.push(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (
                    page <=
                    data.feed.count / LINKS_PER_PAGE
                  ) {
                    const nextPage = page + 1;
                    history.push(`/new/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Hi;


// to make changes: database in schema.prisma, then GraphQl in schema.graphQL, then LinkList.js, then restart the 4000