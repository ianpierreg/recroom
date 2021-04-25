var debug = process.env.NODE_ENV !== "production"; // detalhe aqui
var webpack = require('webpack');
const Uglify = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  watch: debug, // Don't watch in production.
  devtool: "source-map", // cheap-source-map will not work with UglifyJsPlugin
  entry: {
    listusers: "./frontend/src/components/ListUsers.js",
    listrooms: "./frontend/src/components/ListRooms.js",
    main: "./frontend/src/components/Main.js",
    addhouse: "./frontend/src/components/AddHouse.js",
  },
  output: {
    filename: "./frontend/static/frontend/build/[name].js",
  },
  resolve: {
    alias: {
      'react-virtualized/List': 'react-virtualized/dist/es/List',
      'react-virtualized/AutoSizer': 'react-virtualized/dist/es/AutoSizer',
    },
  },
  plugins: debug ? [
    function() {
      this.plugin('watch-run', function(watching, callback) {
        console.log('Begin compile at ' + new Date());
        callback();
      })
    }
  ] : [ // Minify and compress only if it's in production.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,   // enable source maps to map errors (stack traces) to modules
      minimize: true,
      output: {
        comments: false, // remove all comments
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|ttf|svg|eot)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
       {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ],
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000000
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
};

