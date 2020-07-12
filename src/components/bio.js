import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import './bio.scss';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/home/" } } }) {
        edges {
          node {
            frontmatter {
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
          }
        }
      }
    }
  `);

  const { profileTitle, profile, profileImage } = data.allMarkdownRemark.edges[0].node.frontmatter;

  return (
    <div className="c-bio o-container">
      <div>
        <Img className="c-bio__image u-high" fluid={profileImage.childImageSharp.fluid} alt={profileTitle} />
      </div>
      <div>
        <h2 className="c-bio__title c-heading">{profileTitle}</h2>
        <div className="c-bio__description u-copy">{profile}</div>
      </div>
    </div>
  );
};

export default Bio;
