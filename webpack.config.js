const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
  externals: {
    gl: "commonjs gl",
    jsdom: "commonjs jsdom",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
};
