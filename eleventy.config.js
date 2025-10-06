import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'

export default function(eleventyConfig) {
  // Register the plugin
  eleventyConfig.addPlugin(nhsukEleventyPlugin, {
    header: {
      service: {
        text: 'DCF design history'
      },
    }
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("assets");

  // Config
  return {
    pathPrefix: "/dcf-design-history", // Fixes asset paths for GitHub Pages
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'docs',
    }
  };
};
