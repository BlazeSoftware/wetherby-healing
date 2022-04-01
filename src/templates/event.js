import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const EventTemplate = ({ data, pageContext, location }) => {
  const { frontmatter, excerpt, html } = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={frontmatter.title} description={frontmatter.description || excerpt}>
      <div className="o-page o-container o-container--large">
        <article>
          <header>
            {frontmatter.featuredImage && frontmatter.featuredImage.childImageSharp && (
              <Img
                className="o-page__image u-high"
                style={{ maxWidth: `600px` }}
                fluid={frontmatter.featuredImage.childImageSharp.fluid}
                alt={frontmatter.title}
              />
            )}
          </header>
          <section
            className="o-page o-container o-container--large u-window-box-large u-copy"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default EventTemplate;

export const pageQuery = graphql`
  query EventBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
