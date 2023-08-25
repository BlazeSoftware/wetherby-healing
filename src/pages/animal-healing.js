import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

const AnimalHealingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AnimalHealingQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/animal-healing/" } } }) {
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

export default AnimalHealingPage;
