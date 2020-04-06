const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const { DefinePlugin } = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge.smart(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: { esModule: true },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    new DefinePlugin({
      FIREBASE_CONFIG: JSON.stringify({
        apiKey: "AIzaSyA8ASj6RToKLTYeamnF0E6ZS_tvvCaexc8",
        authDomain: "issho-ni.firebaseapp.com",
        databaseURL: "https://issho-ni.firebaseio.com",
        projectId: "issho-ni",
        storageBucket: "issho-ni.appspot.com",
        messagingSenderId: "145168256109",
        appId: "1:145168256109:web:4d7e4c3e0c875752a10364",
        measurementId: "G-7CV701T0T6",
      }),
    }),
  ],
})
