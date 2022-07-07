import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import EventPoster from './event-poster';

const EventList = () => {
  const data = useStaticQuery(graphql`
    query EventList {
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/events/" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const events = data.allMarkdownRemark.edges;

  return (
    <section>
      {events.map(({ node: { frontmatter } }, i) => {
        const props = {
          title: frontmatter.title,
          featuredImage: frontmatter.featuredImage,
        };

        return <EventPoster key={frontmatter.title + i} {...props} />;
      })}
    </section>
  );
};

export default EventList;
