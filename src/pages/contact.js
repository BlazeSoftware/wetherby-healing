import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './contact.scss';
import Layout from '../components/layout';

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
      <div className="o-contact o-container o-container--small u-pillar-box-large">
        <form name="contact" method="POST" action="/thanks" data-netlify={true}>
          <label class="o-form-element c-label" htmlFor="name">
            Name
            <input id="name" name="name" class="c-field" required />
          </label>
          <label class="o-form-element c-label" htmlFor="email">
            Email
            <input id="email" name="email" class="c-field" type="email" required />
          </label>
          <label class="o-form-element c-label" htmlFor="email">
            Subject
            <input id="subject" name="subject" class="c-field" required />
          </label>
          <label class="o-form-element c-label" htmlFor="email">
            Message
            <textarea id="message" name="message" class="c-field" rows={7} required />
          </label>
          <div class="o-form-element">
            <button class="c-button c-button--block c-button--ghost">
              Send Message{' '}
              <span className="c-button__icon-right">
                <i class="fas fa-paper-plane"></i>
              </span>
            </button>
          </div>
        </form>
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

export default ContactPage;
