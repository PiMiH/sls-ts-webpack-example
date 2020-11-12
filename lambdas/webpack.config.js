const path = require('path');
const slsw = require('serverless-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');
let isDebug = true;

const splitDir = __dirname.replace(/\\/g, "/").split('/');
for (let i = 0; i < splitDir.length; i++) {
  const dir = splitDir.join('/')+'/env.json';
  if(fs.existsSync(dir)) {
    const rawTxt = fs.readFileSync(dir);
    isDebug = JSON.parse(rawTxt).DEBUG_MODE;
    break;
  }
  splitDir.pop();
}

module.exports = {
  mode: isDebug ? 'development' : 'production',
  devtool: isDebug ? 'source-map' : 'none',
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  },
  target: 'node',
  resolve: {
    extensions: ['.mjs', '.ts', '.js']
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  externals: ['aws-sdk'],
  optimization: {
		minimize: !isDebug,
		minimizer: [
		  new TerserPlugin(
			{ cache: true, parallel: true, terserOptions: { output: {comments: false} } }
		  )
		],
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},
			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
}