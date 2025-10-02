import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'

export default function(eleventyConfig) {
  // Register NHS.UK plugin
  eleventyConfig.addPlugin(nhsukEleventyPlugin)

  return {
    pathPrefix: "/dcf-design-history"
         }

  // Register Eleventy Navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'docs',
    }
  }
}