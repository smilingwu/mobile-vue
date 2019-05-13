const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    // 输出文件目录
    // outputDir: "build/project",
    outputDir: process.env.outputDir,
    // eslint-loader 是否在保存的时候检查
    // lintOnSave: true,
    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: '',
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/main.js',
    },
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: true,
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    // css相关配置
    css: {
        modules: true,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        // 把px单位换算成rem单位
                        rootValue: 75, // 换算的基数
                        selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ],
            },
        },
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        // loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    // parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: true,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // pwa: {
    //   name: 'mwap',
    //   themeColor: '#4DBA87',
    //   msTileColor: '#000000',
    //   appleMobileWebAppCapable: 'no',
    //   appleMobileWebAppStatusBarStyle: 'default', // 'black',
    //   assetsVersion: '0.1.2',
    //   manifestPath: 'manifest.json',
    //   iconPaths: {}
    //   // configure the workbox plugin
    //   // workboxPluginMode: 'InjectManifest',
    //   // workboxOptions: {
    //   //   // skipWaiting: true,
    //   //   // clientsClaim: true,
    //   //   // swSrc: 'dev/sw.js',
    //   // }
    //   // workboxOptions: {
    //   //   // swSrc is required in InjectManifest mode.
    //   //   swSrc: 'dev/sw.js',
    //   //   // ...other Workbox options...
    //   // }
    //   // configure the workbox plugin
    //   // workboxPluginMode: 'InjectManifest',
    // },
    // webpack-dev-server 相关配置
    devServer: {
        port: '8080',
        proxy: {
            '/api': {
                // 接口地址
                target: 'http://api-test.com',
                ws: true,
                changeOrigin: true,
            },
        },
    },
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.plugins.delete('prefetch'),
            config.resolve.alias
                .set('@', resolve('src'))
                .set('@A', resolve('src/assets'))
                .set('@C', resolve('src/components'))
                .set('@V', resolve('src/views'))
                .set('@U', resolve('src/utils'))
                .set('@S', resolve('src/store'))
                .set('@R', resolve('src/route'));
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('html-loader')
            .end()
            .use('markdown-loader')
            .loader('markdown-loader');
    },
};
