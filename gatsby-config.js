module.exports = {
  siteMetadata: {
    title: `Wetherby Healing`,
    description: `The spiritual route to healing and health delivered by clairvoyant and Reiki Master Deborah Watson.`,
    siteUrl: `https://wetherby-healing.com/`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                heading: 'c-heading u-centered',
                paragraph: 'c-paragraph',
                link: 'c-link',
                list: 'c-list',
                listItem: 'c-list__item',
                blockquote: 'u-blockquote u-text--italic u-large',
                image: 'o-image u-high',
              },
            },
          },
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Wetherby Healing`,
        short_name: `Wetherby Healing`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#19a89e`,
        display: `minimal-ui`,
        icon: `src/img/logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`cssnano`)({
            preset: [
              `default`,
              {
                autoprefixer: { browsers: `last 2 versions`, add: true },
                zindex: false,
              },
            ],
          }),
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
