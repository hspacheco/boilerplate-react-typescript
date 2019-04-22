const PATH = require("path");
const WEBPACK = require("webpack");
const COMBINE_LOADERS = require("webpack-combine-loaders");
// const FAVICONS_PLUGIN = require("favicons-webpack-plugin");
const HTML_PLUGIN = require("html-webpack-plugin");
const FORK_TS_CHECKER_PLUGIN = require("fork-ts-checker-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index",
	target: "web",
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".json"],
	},
	devtool: "source-map",
	devServer: {
		contentBase: PATH.join(__dirname, "dist"),
		publicPath: "/",
		historyApiFallback: true,
	},
	output: {
		path: PATH.join(__dirname, "dist"),
		filename: `bundle.[hash].js`,
		publicPath: "/",
		sourceMapFilename: "bundle.[hash].js.map",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /react-icons.*\.js$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /^index.html$/,
				use: [
					{
						loader: "html-loader",
						options: {
							interpolate: true,
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						query: {
							modules: false,
							importLoaders: 1,
							localIdentName: "[path]__[local]___[hash:base64:5]",
						},
					},
					{
						loader: "postcss-loader",
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						query: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[path]__[local]___[hash:base64:5]",
						},
					},
					{
						loader: "sass-loader",
						query: {
							includePaths: ["./src"],
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "less-loader",
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},
			{
				test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
				loader: "url-loader?mimetype=application/font-woff",
			},
			{
				test: /\.(ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/,
				loader: "file-loader?name=[name].[ext]",
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ["file-loader?hash=sha512&digest=hex&name=[hash].[ext]"],
			},
		],
	},
	plugins: [
		new WEBPACK.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"),
		}),
		new HTML_PLUGIN({
			title: "playground",
			filename: "index.html",
			template: "./public/index.html",
		}),
		// new FAVICONS_PLUGIN({
		// 	logo: "./src/assets/favicon/favicon.png",
		// 	inject: true,
		// }),
		new FORK_TS_CHECKER_PLUGIN({
			tsconfig: PATH.join(__dirname, "./tsconfig.json"),
		}),
	],
};
