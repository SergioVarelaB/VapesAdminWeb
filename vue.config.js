const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/VapesAdminWeb/',
  transpileDependencies: true,
  devServer: {
    proxy: 'https://284d-2806-2f0-34e0-a285-bdae-9098-b4ae-3c33.ngrok-free.app',
}
})
