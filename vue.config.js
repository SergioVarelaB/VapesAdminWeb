const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/VapesAdminWeb/',
  transpileDependencies: true,
  devServer: {
    proxy: 'https://9349-2806-2f0-34e0-a285-c0a9-1b01-19c6-59b3.ngrok-free.app',
}
})
