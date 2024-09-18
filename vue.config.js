const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/VapesAdminWeb/',
  transpileDependencies: true,
  devServer: {
    proxy: 'https://vapesadmin.onrender.com',
}
})
