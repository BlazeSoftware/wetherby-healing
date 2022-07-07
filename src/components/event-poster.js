import React from 'react';
import Img from 'gatsby-image';

const EventPoster = ({ title, featuredImage }) => (
  <div className="o-page o-container o-container--medium u-window-box-large">
    {featuredImage && featuredImage.childImageSharp && (
      <Img className="o-page__image u-high" fluid={featuredImage.childImageSharp.fluid} alt={title} />
    )}
  </div>
);

export default EventPoster;
