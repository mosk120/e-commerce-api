module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:123123',
                changeOrigin: true
            },
        }
    }
}