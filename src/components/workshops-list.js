import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import EventLink from './event-link';

const WorkshopsList = () => {
  const data = useStaticQuery(graphql`
    query WorkshopsList {
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/workshops/" } } }
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

  const workshops = data.allMarkdownRemark.edges;

  return (
    <section>
      <h2 className="c-heading c-heading--secondary">Workshops</h2>
      <div>
        {workshops.map(({ node: { fields, frontmatter, excerpt } }, i) => {
          const props = {
            slug: fields.slug,
            title: frontmatter.title,
            featuredImage: frontmatter.featuredImage,
            description: frontmatter.description || excerpt,
          };

          return <EventLink key={frontmatter.title + i} {...props} />;
        })}
      </div>
    </section>
  );
};

export default WorkshopsList;
