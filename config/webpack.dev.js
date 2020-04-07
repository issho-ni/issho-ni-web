const firebase = require("firebase")
const fs = require("fs")
const path = require("path")
const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack")
const merge = require("webpack-merge")
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
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      FIREBASE_CONFIG: JSON.stringify({
        apiKey: "AIzaSyBtRqFW8yZu43-kyWq2SV49r5njLnprv8g",
        authDomain: "issho-ni-dev.firebaseapp.com",
        databaseURL: "https://issho-ni-dev.firebaseio.com",
        projectId: "issho-ni-dev",
        storageBucket: "issho-ni-dev.appspot.com",
        messagingSenderId: "267256160713",
        appId: "1:267256160713:web:99d50ebb4c2d8a144ac818",
        measurementId: "G-YS3VY3041R",
      }),
      FIREBASE_SIGN_IN_OPTIONS: JSON.stringify([
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]),
    }),
  ],
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
