import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

import './booking.scss';

const BookingThanksPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query BookingThanksQuery {
      page: allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/site/booking/" } } }
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
        filter: { fields: { slug: { regex: "^/blocks/booking/" } } }
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
      <div className="o-container o-container--medium u-centered u-window-box-large u-copy">
        <h1 className="c-heading">Thank you for your booking request</h1>
        <div className="u-letter-box-super u-large">
          I will be in touch shortly.
        </div>
      </div>
      <div className="o-contact">
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

export default BookingThanksPage;
