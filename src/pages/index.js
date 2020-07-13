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
            }
            html
          }
        }
      }
      principles: allMarkdownRemark(filter: { fields: { slug: { regex: "^/blocks/principles-of-reiki/" } } }) {
        edges {
          node {
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  `);
  const {
    frontmatter: { title },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  const principles = data.principles.edges[0].node;

  return (
    <Layout location={location} title={title} description={data.site.siteMetadata.description}>
      {html && (
        <section
          className="o-container o-container--medium u-window-box-large u-justified u-copy"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      {principles && (
        <section className="o-container o-container--medium u-window-box-large u-justified u-copy">
          <h2 className="c-heading u-centered">{principles.frontmatter.title}</h2>
          <div className="u-centered" dangerouslySetInnerHTML={{ __html: principles.html }} />
        </section>
      )}
      <TestimonialsList />
      <Bio />
    </Layout>
  );
};

export default HomePage;
