module.exports = {
  devServer: {
    proxy: {
      "^/(goods|mall|category|register|login)": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  configureWebpack: {
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: "all"
      }
    }
  }
};
