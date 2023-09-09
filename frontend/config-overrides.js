const { override, addWebpackModuleRule, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'resolve-url-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          // Provide path to the file with resources
          resources: './src/assets/styles/global.scss',
        },
      },
    ],
  }),
  addWebpackAlias({
    stream: require.resolve('stream-browserify'),
  })
);
