const { withSentryConfig } = require("@sentry/nextjs");
const removeImports = require("next-remove-imports")();

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});

const configWithMDX = withMDX({
  // Pick up MDX files in the /pages/ directory
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  outputFileTracing: false,
});

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = removeImports(
  process.env.SENTRY_AUTH_TOKEN
    ? withSentryConfig(configWithMDX, SentryWebpackPluginOptions)
    : configWithMDX
);
