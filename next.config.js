const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
const removeImports = require("next-remove-imports")();
const configWithMDX = withMDX({
  // Pick up MDX files in the /pages/ directory
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...removeImports(configWithMDX),
  // Standalone mode doesn't work well with dynamic content like our MDX courses files
  // output: "standalone",
  // experimental: {
  //   outputFileTracingIncludes: { "/": ["./courses/**/*"] },
  // },
};

module.exports = nextConfig;
