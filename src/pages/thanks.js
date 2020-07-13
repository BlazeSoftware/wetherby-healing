import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './contact.scss';
import Layout from '../components/layout';

const ContactSuccessPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ContactSuccessQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/contact/" } } }) {
        edges {
          node {
            frontmatter {
              title
              description
            }
            html
          }
        }
      }
    }
  `);

  const {
    frontmatter: { title, description },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout location={location} title={title} description={description}>
      <div className="o-container o-container--medium u-centered u-window-box-large u-copy">
        <h1 className="c-heading">Thank you for your message!</h1>
      </div>
      <div className="o-contact">
        <div className="o-page">
          <section
            className="o-container o-container--large u-window-box-large u-copy"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ContactSuccessPage;
