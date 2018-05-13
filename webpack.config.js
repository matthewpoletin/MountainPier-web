const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const production = process.env["NODE_ENV"] === "production";

const env = process.env.NODE_ENV;

const config = {
	mode: env || "development",
	entry: path.join(__dirname, "src", "component", "index.js"),
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.jsx?$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env", "react"]
					}
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								minimize: production,
							},
						},
					],
				}),
			},
		],
	},
	output: {
		filename: "index.bundle.js",
		path: path.resolve(__dirname, "public/js"),
	},
	plugins: production ? [
		new ExtractTextPlugin("../css/index.bundle.css"),
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
			},
		}),
	] : [
		new ExtractTextPlugin("../css/index.bundle.css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
			},
		}),
	],
};

module.exports = config;