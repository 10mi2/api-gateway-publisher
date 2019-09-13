

module.exports = {
  module: {
    rules: [
      {
        test: /\.(html|css)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
    ],
  },
};