const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  entry: [
    './src/app.js',
    './src/sass/style.sass'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.(png|jpg|woff2)$/,
        loader: "url-loader",
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions', 'IE > 7']
                }),
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CopyWebpackPlugin([{
        from: 'src/3dmodels',
        to: '3dmodels'
      },
      {
        from: 'src/icons',
        to: 'icons'
      }
    ]),
    new HtmlWebpackPlugin({
      // filename is the name of the output file
      // template is the name of the source file
      filename: 'index.html',
      template: 'index.html'
    }),
  ]
};