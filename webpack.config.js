import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { fileURLToPath } from 'url';
import ReactRefreshTypeScript from 'react-refresh-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		clean: true,
	},
	devtool: 'eval',
	devServer: {
		historyApiFallback: true,
		hot: true,
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://edu-stub.bpm.lanit:13888',
				secure: false,
				changeOrigin: true,
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			favicon: './src/assets/img/favicon.ico',
		}),
		new ReactRefreshWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				exclude: ['/node_modules/'],
				use: {
					loader: 'ts-loader',
					options: {
						getCustomTransformers: () => ({
							before: [ReactRefreshTypeScript()].filter(Boolean),
						}),
					},
				},
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.jsx', '.js', '.png', '...'],
		modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
		plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
	},
};

export default () => {
	if (isProduction) {
		config.mode = 'production';

		config.plugins.push(new MiniCssExtractPlugin());
	} else {
		config.mode = 'development';
	}
	return config;
};
