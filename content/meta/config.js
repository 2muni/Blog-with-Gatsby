const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "2muni's Blog - Life & Development", // <title>
  shortSiteTitle: "2muni's Blog", // <title> ending for posts and pages
  siteDescription: "PersonalBlog for Life & Development.",
  siteUrl: "blog.2muni.com",
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "ko",
  // author
  authorName: "2muni",
  // authorTwitterAccount: "greglobinski",
  // info
  infoTitle: "2muni",
  infoTitleNote: "Life & Develop",
  // manifest.json
  manifestName: "2muni's Blog - Life & Development",
  manifestShortName: "2muni's Blog", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "relesinc@gmail.com",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/2muni" }
    // { name: "twitter", url: "https://twitter.com/greglobinski" },
    // { name: "facebook", url: "http://facebook.com/greglobinski" }
  ]
};
