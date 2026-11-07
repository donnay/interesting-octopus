module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/search-index.json": "search-index.json" });
  eleventyConfig.addPassthroughCopy({ "src/assets/GenesisScreenShot.png": "GenesisScreenShot.png" });

  return {
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
