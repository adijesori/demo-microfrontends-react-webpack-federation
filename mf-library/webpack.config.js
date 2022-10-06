const WebpackHtmlPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin =
  require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require("./package.json");

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel
         to compile any file with extension
         .js */
        test: /\.js?$/,

        /* exclude node_modules directory from babel.
        Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        use: [
          {
            // To Use babel Loader
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env' /* to transfer any advansed ES to ES5 */,
                '@babel/preset-react'], // to compile react to ES5
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfLibrary',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
        './Button': './src/Button',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      }
    }),
    new WebpackHtmlPlugin({
      template: './public/index.html'
    })
  ]
};
