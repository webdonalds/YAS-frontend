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
      '120': '30rem',
      '144':'36rem',
      '192': '48rem',
      '9/10': '90%',
      '4/5': '80%',
      '1/2': '50%',
      'full': '100%'
    }
  },
  maxWidth: {
    'full': '100%',
    '9/10': '90%',
    '3/4': '75%'
  },
  backgroundColor: theme => ({
    ...theme('colors'),
    'main': '#8b00ff',
  }),
};