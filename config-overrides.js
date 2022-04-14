const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),  
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    return config;
}