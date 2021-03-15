import HtmlWebPackPlugin from "html-webpack-plugin";

export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }
  ]
};
export const plugins = [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })
];

export const theme = {
  extend: {
    spacing: {
      '192': '48rem',
      '9/10': '90%',
      '1/2': '50%'
    }
  },
  maxWidth: {
    '9/10': '90%'
  }
};