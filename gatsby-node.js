const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { fmImagesToRelative } = require(`gatsby-remark-relative-images`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const eventTemplate = path.resolve(`./src/templates/event.js`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "^/events/" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create pages.
  const events = result.data.allMarkdownRemark.edges;

  events.forEach((event, index) => {
    const previous = index === events.length - 1 ? null : events[index + 1].node;
    const next = index === 0 ? null : events[index - 1].node;

    createPage({
      path: event.node.fields.slug,
      component: eventTemplate,
      context: {
        slug: event.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
