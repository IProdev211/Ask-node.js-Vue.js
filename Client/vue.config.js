const webpack = require('webpack');
const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

// vue.config.js
module.exports = {
  // The source of CKEditor is encapsulated in ES6 modules. By default, the code
  // from the node_modules directory is not transpiled, so you must explicitly tell
  // the CLI tools to transpile JavaScript files in all ckeditor5-* modules.
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
  lintOnSave: true,
  // publicPath: undefined,
  // outputDir: undefined,
  // assetsDir: undefined,
  // runtimeCompiler: undefined,
  // productionSourceMap: undefined,
  // parallel: undefined,

  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        src: resolveSrc('src'),
        assets: resolveSrc('src/assets'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      // CKEditor needs its own plugin to be built using webpack.
      new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en'
      })
    ]
  },

  pwa: {
    name: 'Ask Arya Website',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },

  pluginOptions: {},

  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  outputDir: path.resolve(__dirname, '../server/dist'),
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000'
      },
      '^/auth/google$': {
        target: 'http://localhost:3000'
      },
      '^/user/activation/': {
        target: 'http://localhost:3000'
      },
      '^/uploads': {
        target: 'http://localhost:3000'
      }
    }
  },

  // Vue CLI would normally use its own loader to load .svg and .css files, however:
  //	1. The icons used by CKEditor must be loaded using raw-loader,
  //	2. The CSS used by CKEditor must be transpiled using PostCSS to load properly.
  chainWebpack: config => {
    // (1.) To handle editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule('svg');

    // Then you can either:
    // * clear all loaders for existing 'svg' rule:
    //		svgRule.uses.clear();
    // * or exclude ckeditor directory from node_modules:
    svgRule.exclude.add(
      path.join(__dirname, 'node_modules', 'ckeditor5-direction')
    );
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

    // Add an entry for *.svg files belonging to CKEditor. You can either:
    // * modify the existing 'svg' rule:
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    // * or add a new one:
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');

    // (2.) Transpile the .css files imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
          },
          minify: true
        });
      });
  }
};
