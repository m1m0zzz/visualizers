import createBundleAnalyzer from "@next/bundle-analyzer"
import createMDX from "@next/mdx"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        // /** @type {import("rehype-pretty-code").Options} */
        // ({
        //   themes: {
        //     light: "github-light",
        //     dark: "github-dark",
        //   },
        // }),
      ],
    ],
  },
})

export default withBundleAnalyzer(withMDX(nextConfig))
