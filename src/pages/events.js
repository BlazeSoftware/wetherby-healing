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
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `);
  const {
    frontmatter: { title, description, featuredImage },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout location={location} title={title} description={description}>
      <div className="o-page o-container o-container--large u-copy">
        {featuredImage && featuredImage.childImageSharp && (
          <Img
            className="o-page__image u-high"
            style={{ maxWidth: `600px` }}
            fluid={featuredImage.childImageSharp.fluid}
            alt={title}
          />
        )}
        <section className="u-window-box-large" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="u-window-box-large">
          <EventList />
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;
