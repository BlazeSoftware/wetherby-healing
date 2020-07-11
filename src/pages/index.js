import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import TestimonialsList from '../components/testimonials-list';
import Bio from '../components/bio';

import './index.scss';

const HomePage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/home/" } } }) {
        edges {
          node {
            frontmatter {
              title
              description
              profileTitle
              profile
              profileImage {
                childImageSharp {
                  fluid(maxWidth: 512) {
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
    frontmatter: { title, description, profileTitle, profile, profileImage },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout location={location} title={title} description={description || data.site.siteMetadata.description}>
      {html && (
        <section
          className="c-home-content o-container o-container--medium u-justified u-copy"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <TestimonialsList />
      <Bio {...{ profileTitle, profile, profileImage }} />
    </Layout>
  );
};

export default HomePage;
