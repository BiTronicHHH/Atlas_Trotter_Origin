// next-sitemap.js
module.exports = {
  siteUrl: 'https://atlastrotter.com/',
  generateRobotsTxt: false,
  exclude: ['/server-sitemap.xml', '/404'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://atlastrotter.com/server-sitemap.xml'],
  },
};
