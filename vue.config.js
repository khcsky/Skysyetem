const Timestamp = new Date().getTime();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    configureWebpack: { // webpack 配置
        output: {
            filename: `js/[name].${Timestamp}.js`,
            chunkFilename: `js/[name].${Timestamp}.js`,

        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `css/[name].${Timestamp}.css`,
                chunkFilename: `css/[name].${Timestamp}.css`
            })
        ],
    },
    publicPath: '/', // vueConf.baseUrl, // 根域上下文目录
     outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    indexPath:"index.html",
    filenameHashing:true,
    pages:undefined,
    lintOnSave:true,
    runtimeCompiler:false,
    transpileDependencies:[],
    productionSourceMap:false,
    crossorigin:undefined,
    integrity:false,
    devServer:{//代理
        port:8090,

    }
}