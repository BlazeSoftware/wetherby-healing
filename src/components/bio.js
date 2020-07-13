import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import './bio.scss';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/blocks/bio/" } } }) {
        edges {
          node {
            frontmatter {
              title
              bioImage {
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

  const { title, bioImage } = data.allMarkdownRemark.edges[0].node.frontmatter;
  const html = data.allMarkdownRemark.edges[0].node.html;

  return (
    <div className="c-bio o-container">
      <div>
        <Img className="c-bio__image u-high" fluid={bioImage.childImageSharp.fluid} alt={title} />
      </div>
      <div>
        <h2 className="c-bio__title c-heading">{title}</h2>
        <div className="c-bio__description u-copy">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
};

export default Bio;
