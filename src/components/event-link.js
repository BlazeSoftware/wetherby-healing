import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './event-link.scss';

const EventLink = ({ slug, title, description, featuredImage }) => (
  <Link className="c-event-link" to={slug}>
    <div className="c-event-link__title">
      <h2 className="c-heading">{title}</h2>
    </div>
    {featuredImage && featuredImage.childImageSharp && (
      <Img className="c-event-link__image" fluid={featuredImage.childImageSharp.fluid} alt={title} />
    )}
    <div className="c-event-link__description">
      <span>{description}</span>
    </div>
  </Link>
);

export default EventLink;
