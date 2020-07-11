import React from 'react';

import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';

const ContactPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
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
      <section dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export default ContactPage;
