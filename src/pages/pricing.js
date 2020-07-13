import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

import './pricing.scss';

const PricingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query PricingQuery {
      page: allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/site/pricing/" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
            }
          }
        }
      }
      blocks: allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/blocks/pricing/" } } }
        sort: { fields: frontmatter___weight }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  `);

  const {
    frontmatter: { title, description },
  } = data.page.edges[0].node;

  return (
    <Layout location={location} title={title} description={description}>
      <div className="o-pricing">
        <div className="o-page">
          <section className="o-container o-container--large u-window-box-large u-copy">
            {data.blocks.edges.map(({ node }, i) => (
              <div key={node.frontmatter.title + i}>
                <h2 className="c-heading">{node.frontmatter.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: node.html }} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
