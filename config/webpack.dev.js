const fs = require("fs")
const merge = require("webpack-merge")
const path = require("path")
const { HotModuleReplacementPlugin } = require("webpack")
const common = require("./webpack.common")

const config = merge.smart(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(common.context, "dist"),
    historyApiFallback: true,
    port: process.env.PORT || 9000,
  },
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin()],
})

try {
  const certPath =
    process.env.TLS_CERT || path.resolve(common.context, "localhost+2.pem")
  const keyPath =
    process.env.TLS_KEY || path.resolve(common.context, "localhost+2-key.pem")

  const cert = fs.readFileSync(certPath)
  const key = fs.readFileSync(keyPath)

  config.devServer.https = { cert, key }
} catch {
  config.devServer.https = true
}

module.exports = config
