const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // ... other webpack configurations
  resolve: {
    fallback: {
      fs: false,  // or use browserify-fs if you need fs functionality
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    // ... other plugins
  ],
};