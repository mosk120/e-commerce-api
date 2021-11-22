module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:123123',
                changeOrigin: true
            },
        }
    },

    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
    },

    transpileDependencies: [
      'quasar'
    ]
}
