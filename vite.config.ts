import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';


function resolve(url: string) {
  return path.resolve(__dirname, url)
}

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
  // 为服务器设置代理规则
  server: {
    host: "0.0.0.0", // 指定服务器主机名
    port: 5173, // 指定服务端口号
    open: true, // 运行自动打开浏览器
    // https: false, // 关闭https
    strictPort: true, // 若3333端口被占用,直接结束项目
    proxy: {
      // 选项写法
      '/jeecg-boot': {
        target: "http://121.89.214.218:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace("", ""),
      }
    },
  }
})
