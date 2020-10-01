var SvgStore = require('webpack-svgstore-plugin');

module.exports = {
    plugins: [
        new SvgStore({
            svgoOptions: {
                plugins: [
                    { removeTitle: true }
                ]
            },
            prefix: 'icon-'
        })
    ]
}