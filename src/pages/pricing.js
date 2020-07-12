import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import PageTemplate from '../components/page';

import './pricing.scss';

const PricingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query PricingQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/pricing/" } } }) {
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
  return (
    <div className="o-pricing">
      <PageTemplate {...{ location, data }} />
    </div>
  );
};

export default PricingPage;
