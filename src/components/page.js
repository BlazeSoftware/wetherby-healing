import React from 'react';
import Img from 'gatsby-image';

import Layout from '../components/layout';

import './page.scss';

const PageTemplate = ({ location, data }) => {
  const {
    frontmatter: { title, description, featuredImage },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout location={location} title={title} description={description}>
      <div className="o-page">
        {featuredImage && (
          <Img
            className="o-page__image u-high"
            style={{ maxWidth: `600px` }}
            fluid={featuredImage.childImageSharp.fluid}
            alt={title}
          />
        )}
        <section
          className="o-container o-container--large u-window-box-large u-copy"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
};

export default PageTemplate;
