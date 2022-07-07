import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import EventList from '../components/event-list';

import './events.scss';

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
      <EventList />
    </Layout>
  );
};

export default EventsPage;
