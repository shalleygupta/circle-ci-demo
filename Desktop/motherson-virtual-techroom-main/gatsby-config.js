module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layout/PageWrapper/index.tsx`),
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        prettier: true, // use prettier to format JS code output (default)
        svgo: false, // use svgo to optimize SVGs (default)
        svgoConfig: {
          removeViewBox: false, // remove viewBox when possible (default)
          cleanupIDs: false, // remove unused IDs and minify remaining IDs (default)
        },
      },
    },
    "gatsby-plugin-use-query-params",
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [
            //`Cache-Control: "public, max-age=3600"`,
            "Feature-Policy: fullscreen *",
          ],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: false, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) =>
          headers.filter(h => !h.toLowerCase().includes("x-frame-options")), // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /*{
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        ///icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },*/
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
