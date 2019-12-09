module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['@babel/preset-env',
      {
        modules: false,
        targets: {
          node: 'current',
          browsers: ['last 2 versions', 'ie >= 11']
        }
      }
    ], ['@babel/preset-react',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment'
      }
    ]],
    plugins: [
      '@babel/plugin-proposal-function-bind',
      '@babel/plugin-proposal-export-default-from',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/transform-runtime',
      'lodash',
      'react-hot-loader/babel'
    ],
    env: {
      test: {
        presets: [['@babel/preset-env', {
          modules: false,
          targets: { node: 'current' }
        }], ['@babel/preset-react',
          {
            pragma: 'h',
            pragmaFrag: 'Fragment'
          }
        ]],
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          '@babel/plugin-proposal-function-bind',
          '@babel/plugin-proposal-export-default-from',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/transform-runtime'
        ]
      }
    }
  }
}
