import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import EventLink from './event-link';

const EventList = () => {
  const data = useStaticQuery(graphql`
    query EventList {
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/events/" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
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
      <h2 className="c-heading c-heading--secondary">Previous Events</h2>
      <div>
        {events.map(({ node: { fields, frontmatter, excerpt } }) => {
          const props = {
            slug: fields.slug,
            title: frontmatter.title,
            featuredImage: frontmatter.featuredImage,
            description: frontmatter.description || excerpt,
          };

          return <EventLink {...props} />;
        })}
      </div>
    </section>
  );
};

export default EventList;
