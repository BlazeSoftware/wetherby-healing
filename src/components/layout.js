import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from './seo';

import './layout.scss';

const Layout = ({ location, children, title, description }) => {
  const data = useStaticQuery(graphql`
    query Layout {
      logo: file(relativePath: { eq: "home.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 325) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderNavLinks = (classes) => (
    <>
      <Link className={classes} activeClassName="active" to={`/reiki-healing`}>
        Reiki Healing
      </Link>
      <Link className={classes} activeClassName="active" to={`/reiki-attunement`}>
        Attunement
      </Link>
      <Link className={classes} activeClassName="active" to={`/psychic-spiritual-readings`}>
        Readings
      </Link>
      <Link className={classes} activeClassName="active" to={`/spiritual-assessments`}>
        Assessments
      </Link>
      <Link className={classes} activeClassName="active" to={`/events`}>
        Events
      </Link>
      <Link className={classes} activeClassName="active" to={`/workshops/`}>
        Workshops
      </Link>
      <Link className={classes} activeClassName="active" to={`/animal-healing`}>
        Animals
      </Link>
      <Link className={classes} activeClassName="active" to={`/pricing`}>
        Pricing
      </Link>
      <Link className={classes} activeClassName="active" to={`/contact`}>
        Contact
      </Link>
    </>
  );

  return (
    <div className="c-layout u-text">
      <SEO title={location.pathname === `/` ? `Welcome` : title} description={description} />
      <header>
        <nav className="o-navbar">
          <div className="c-navbar">
            <Link className="c-navbar__link c-navbar__link--home" activeClassName="active" to={`/`}>
              Wetherby Healing
            </Link>
            {renderNavLinks(`c-navbar__link`)}
            <button
              aria-label="Menu button"
              className="c-navbar__link c-navbar__link--menu c-button c-button--nude"
              onClick={() => setMenuOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
            <aside className={`c-menu ${menuOpen ? `c-menu--open` : ``}`}>
              <button className="c-button c-button--nude " onClick={() => setMenuOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
              <nav className="c-menu__nav">
                <Link className="c-navbar__link" activeClassName="active" to={`/`}>
                  Home
                </Link>
                {renderNavLinks(`c-navbar__link`)}
              </nav>
            </aside>
          </div>
        </nav>

        {location.pathname === `/` && <Img className="o-banner" fluid={data.logo.childImageSharp.fluid} alt="banner" />}

        <div className={`o-header ${location.pathname === `/` ? `o-header--home` : ``}`}>
          <div className="o-container o-container--large">
            <h1 className="c-heading c-heading--title u-centered">{title}</h1>
          </div>
        </div>
        {location.pathname !== `/` && description && (
          <div className="o-sub-header o-container o-container--large">
            {description && <h3 className="c-heading c-heading--sub u-centered">{description}</h3>}
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="c-footer">
        <div>
          <Link className="c-footer__link c-footer__link--home" to={`/`}>
            Wetherby Healing
          </Link>
        </div>
        <div>
          {renderNavLinks(`c-footer__link`)}
          <Link className="c-footer__link" activeClassName="active" to={`/about`}>
            About
          </Link>
          <div className="u-letter-box-large">&copy; {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
