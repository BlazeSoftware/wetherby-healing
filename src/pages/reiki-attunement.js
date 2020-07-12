import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

const AttunementPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AttunementQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/reiki-attunement/" } } }) {
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

export default AttunementPage;
