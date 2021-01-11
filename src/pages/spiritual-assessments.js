import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

const SpiritualAssessmentsPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query SpiritualAssessmentsQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/spiritual-assessments/" } } }) {
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

export default SpiritualAssessmentsPage;
