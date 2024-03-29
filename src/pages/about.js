import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

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

  return <PageTemplate {...{ location, data }} />;
};

export default AboutPage;
