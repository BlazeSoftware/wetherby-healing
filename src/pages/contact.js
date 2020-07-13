import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';

import './contact.scss';

const ContactPage = ({ location }) => {
  const data = useStaticQuery(graphql`
  query ContactQuery {
    page: allMarkdownRemark(filter: {fields: {slug: {regex: "^/site/contact/"}}, frontmatter: {description: {ne: null}}}) {
      edges {
        node {
          frontmatter {
            title
            description
          }
        }
      }
    }
    sections: allMarkdownRemark(filter: {fields: {slug: {regex: "^/site/contact/"}}, html: {ne: ""}}, sort: {fields: frontmatter___weight}) {
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
        <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" />
          <label className="o-form-element c-label" htmlFor="name">
            Name
            <input id="name" name="name" className="c-field" required />
          </label>
          <label className="o-form-element c-label" htmlFor="email">
            Email
            <input id="email" name="email" className="c-field" type="email" required />
          </label>
          <label className="o-form-element c-label" htmlFor="email">
            Subject
            <input id="subject" name="subject" className="c-field" required />
          </label>
          <label className="o-form-element c-label" htmlFor="email">
            Message
            <textarea id="message" name="message" className="c-field" rows={7} required />
          </label>
          <div className="o-form-element">
            <button className="c-button c-button--block c-button--ghost">
              Send Message{' '}
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
            {data.sections.edges.map(({ node }, i) => (
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
