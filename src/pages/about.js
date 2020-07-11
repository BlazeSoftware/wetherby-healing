import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

import './about.scss';

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/about/" } } }) {
        edges {
          node {
            frontmatter {
              title
              description
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 600) {
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
      <div className="c-about">
        <Img className="c-about__image u-high" style={{ maxWidth: `600px` }} fluid={featuredImage.childImageSharp.fluid} alt={title} />
        <section className="c-about__content o-container o-container--large u-copy" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export default AboutPage;
