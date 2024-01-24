const config = {
    mode: 'production',
    entry: {
        search: './src/js/search.js',
        mobile: './src/js/mobile.js',
        sliderHero: './src/js/sliderHero.js',
        sliderBecome: './src/js/sliderBecome.js',
        modal: './src/js/modal.js'
    },
    output: {
        filename: '[name].bundle.js'
    },
    // devtool: 'source-map',  //* Show errors webpack
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}  

module.exports = config;