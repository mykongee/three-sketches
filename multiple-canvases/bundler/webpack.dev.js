const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer: {
            watchFiles: ['src/**', 'static/**'],
            static: {
                watch: true,
                directory: path.join(__dirname, '../static')
            },
            client: {
                logging: 'none',
                overlay: true,
                progress: false
            }
        }
    }
)