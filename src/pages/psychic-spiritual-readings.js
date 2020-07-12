import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

const ReadingsPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ReadingsQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/psychic-spiritual-readings/" } } }) {
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

  return <PageTemplate {...{ location, data }} />;
};

export default ReadingsPage;
