import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

const HealingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query HealingQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/reiki-healing/" } } }) {
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

export default HealingPage;
