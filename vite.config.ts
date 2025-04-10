import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	server:{
		host: '0.0.0.0',
		proxy: {
			'/Amanager': {
				target: 'http://192.168.1.6:1818',
				changeOrigin: true,
		
			},
			'/personal_center': {
				target: 'http://192.168.1.6:1818',
				changeOrigin: true,
		
			},
			'/login':{
				target: 'http://192.168.1.6:1818',
				changeOrigin: true,
			},
			'/dialogue':{
				target: 'http://192.168.1.6:1818',
				changeOrigin: true,
			},
			'/language':{
				target: 'http://192.168.1.6:1818',
				changeOrigin: true,
			}
			

		}
	},
	optimizeDeps: {
		include: ['schart.js']
	},
	resolve: {
		alias: {
			'@': '/src',
			'~': '/src/assets'
		}
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
});
