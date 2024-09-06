module.exports = {
presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['./app'],
        alias: {
          '@': './app',
          '@components': './app/components',
          '@scenes': './app/screens',
          '@store': './app/store',
          '@utils': './app/utils',
          '@theme': './app/theme',
          '@navigator': './app/routes',
          '@local': './app/i18n',
        },
      },
    ],
    'react-native-reanimated/plugin', // Include reanimated plugin once
  ],
};
