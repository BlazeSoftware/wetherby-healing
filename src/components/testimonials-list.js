import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Slider from 'react-slick';

import './testimonials-list.scss';

const TestimonialsList = () => {
  const data = useStaticQuery(graphql`
    query TestimonialsList {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/testimonials/" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              title
              description
              customer
            }
          }
        }
      }
    }
  `);

  const testimonials = data.allMarkdownRemark.edges;

  const settings = {
    dots: false,
    fade: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <section className="c-testimonials">
      <h2 className="c-heading c-heading--secondary">Testimonials</h2>
      <div className="o-container o-container--medium">
        <Slider {...settings}>
          {testimonials.map(({ node: { frontmatter } }, i) => {
            return (
              <div className="c-slide u-letter-box-small" key={frontmatter.title + i}>
                <h2 className="c-slide__heading u-centered u-xlarge">{frontmatter.title}</h2>
                <div className="c-slide__text u-centered">{frontmatter.description}</div>
                {frontmatter.customer && (
                  <div className="c-slide__text u-text--italic u-centered u-letter-box-medium">- {frontmatter.customer} -</div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsList;
