const { withSentryConfig } = require("@sentry/nextjs");
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
const removeImports = require("next-remove-imports")();

const configWithMDX = withMDX({
  // Pick up MDX files in the /pages/ directory
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
const SentryWebpackPluginOptions = {
  silent: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports = removeImports(
  process.env.SENTRY_AUTH_TOKEN
    ? withSentryConfig(configWithMDX, SentryWebpackPluginOptions)
    : configWithMDX
);
