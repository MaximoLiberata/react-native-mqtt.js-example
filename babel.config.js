module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					root: ['./src'],
					extensions: [
						'.ios.js',
						'.android.js',
						'.js',
						'.jsx',
						'.ts',
						'.tsx',
						'.json',
					],
					alias: {
						src: './src',
					},
				},
			],
		],
	}
}
