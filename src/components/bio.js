import React from 'react';
import Img from 'gatsby-image';

import './bio.scss';

const Bio = ({ profileTitle, profile, profileImage }) => (
  <div className="c-bio o-container">
    <div>
      <Img className="c-bio__image u-high" fluid={profileImage.childImageSharp.fluid} alt={profileTitle} />
    </div>
    <div>
      <h2 className="c-bio__title c-heading">{profileTitle}</h2>
      <div className="c-bio__description u-copy">{profile}</div>
    </div>
  </div>
);

export default Bio;
