import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const EventTemplate = ({ data, pageContext, location }) => {
  const { frontmatter, excerpt, html } = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={frontmatter.title} description={frontmatter.description || excerpt}>
      <article>
        <header>
          {frontmatter.featuredImage && frontmatter.featuredImage.childImageSharp && (
            <Img fluid={frontmatter.featuredImage.childImageSharp.fluid} alt={frontmatter.title} />
          )}
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <nav className="o-page-nav u-letter-box-super">
        <div className="u-left">
          {previous && (
            <Link className="c-button c-button--ghost c-button--brand" to={previous.fields.slug} rel="prev">
              <i className="fas fa-chevron-left u-small"></i>
              {` `}
              {previous.frontmatter.title}
            </Link>
          )}
        </div>
        <div className="u-right">
          {next && (
            <Link className="c-button c-button--ghost c-button--brand" to={next.fields.slug} rel="next">
              {next.frontmatter.title}
              {` `}
              <i className="fas fa-chevron-right u-small"></i>
            </Link>
          )}
        </div>
      </nav>
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
