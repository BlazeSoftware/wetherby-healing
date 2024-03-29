import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

import './contact.scss';

const ContactPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      page: allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/contact/" } } }) {
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
        filter: { fields: { slug: { regex: "^/blocks/contact/" } } }
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
      <div className="o-contact o-container o-container--small u-pillar-box-large">
        <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" action="/thanks">
          <input type="hidden" name="form-name" value="contact" />
          <label className="o-form-element c-label" htmlFor="name">
            Name
            <input id="name" name="name" className="c-field" required />
          </label>
          <label className="o-form-element c-label">
            Telephone
            <input id="telephone" name="telephone" className="c-field" type="tel" />
          </label>
          <label className="o-form-element c-label" htmlFor="email">
            Email
            <input id="email" name="email" className="c-field" type="email" />
          </label>
          <div className="o-form-element u-letter-box-large">
            <button className="c-button c-button--block c-button--ghost">
              Send Message
              <span className="c-button__icon-right">
                <i className="fas fa-paper-plane"></i>
              </span>
            </button>
          </div>
        </form>
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

export default ContactPage;
