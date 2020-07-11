import React from 'react';

import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import EventList from '../components/event-list';

const EventsPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query EventsQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/calendar/" } } }) {
        edges {
          node {
            frontmatter {
              title
              description
            }
            html
          }
        }
      }
    }
  `);
  const {
    frontmatter: { title, description },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout location={location} title={title} description={description}>
      <section dangerouslySetInnerHTML={{ __html: html }} />
      <div className="u-letter-box-small">
        <EventList />
      </div>
    </Layout>
  );
};

export default EventsPage;
