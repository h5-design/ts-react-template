const fs = require('fs');
const paths = require('./paths');
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
    resolve: {
        //自动解析确定的扩展
        extensions: paths.moduleFileExtensions
            .map(ext => `.${ext}`)
            .filter(ext => useTypeScript || !ext.includes('ts')),
        alias: {
        },
        plugins: [
            //https://github.com/arcanis/pnp-webpack-plugin
            PnpWebpackPlugin,
            //阻止用户从src /（或node_modules /）之外导入的文件。
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    resolveLoader: {
        plugins: [
            //https://github.com/arcanis/pnp-webpack-plugin
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    module: {
        //使丢失的导出成为错误而不是警告
        strictExportPresence: true,
        rules: [
            //禁用 require.ensure
            { parser: { requireEnsure: false } },
            //代码检查
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: require.resolve('eslint-loader'),
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),

                        }
                    },
                ],
                include: paths.appSrc,
            },
        ]
    },
    plugins: [
        //资源错误
        new ModuleNotFoundPlugin(paths.appPath),
        // TypeScript type 检查
        useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
            typescript: resolve.sync('typescript', {
                basedir: paths.appNodeModules,
            }),
            async: false,
            checkSyntacticErrors: true,
            tsconfig: paths.appTsConfig,
            compilerOptions: {
                module: 'esnext',
                moduleResolution: 'node',
                resolveJsonModule: true,
                isolatedModules: true,
                noEmit: true,
                jsx: 'preserve',
            },
            reportFiles: [
                '**',
                '!**/*.json',
                '!**/__tests__/**',
                '!**/?(*.)(spec|test).*',
                '!src/setupProxy.js',
                '!src/setupTests.*',
            ],
            watch: paths.appSrc,
            silent: true,
            formatter: typescriptFormatter,
        }),
        // Moment.js //暂时不使用。先干掉
        //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ].filter(Boolean),

    // 有些库虽然引用了。但是并没有用到，在游览器中将这个变量 变为 'empty' 字符串
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    //性能监控关闭，因为有自己的性能监控
    performance: false,
};
