const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
const removeImports = require("next-remove-imports")();

const configWithMDX = withMDX({
  // Pick up MDX files in the /pages/ directory
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

module.exports = removeImports(configWithMDX);
