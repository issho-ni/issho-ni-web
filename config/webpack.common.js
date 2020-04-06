const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  context: path.resolve(__dirname, ".."),
  resolve: {
    extensions: [".css", ".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["postcss-loader"],
      },
      {
        test: /\.tsx?$/,
        use: ["ts-loader", "astroturf/loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({ title: "一緒に Issho Ni" }),
  ],
}
