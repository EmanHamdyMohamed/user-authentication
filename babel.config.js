const { NODE_ENV } = process.env;

const inTest = NODE_ENV === 'test';

module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);
    const ignorable = [
        /node_modules/
    ];

    if (!inTest) {
        ignorable.push('/.test.js$/');
    }
    return {
        ignore: ignorable,
        presets: [
            '@babel/preset-env',
            // '@babel/preset-flow'
        ],
        compact: true,
        plugins: [
        //     '@babel/plugin-transform-flow-strip-types',
        //     [
        //         'module-resolver',
        //         {
        //             'root': [
        //                 './'
        //             ],
        //             'alias': {
        //                 'logger': './src/utils/logger.js',
        //                 'utils': './src/utils',
        //                 'requestTypes': './src/requestTypes'
        //             }
        //         }
        //     ],
        //     [
        //         '@babel/plugin-transform-runtime',
        //         {
        //             'regenerator': true
        //         }
        //     ],
            // '@babel/plugin-syntax-dynamic-import',
        //     '@babel/plugin-transform-modules-commonjs',
        //     '@babel/plugin-syntax-import-meta',
        //     '@babel/plugin-proposal-export-namespace-from',
        //     '@babel/plugin-proposal-throw-expressions',
        //     '@babel/plugin-proposal-export-default-from',
        ]
    };
};
