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
			'/api': {
				target:'http://192.168.1.100:81',
				changeOrigin: true,
			},
			'/Amanager': {
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
		
			},
			'/personal_center': {
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
		
			},
			'/login':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/dialogue':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/language':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/code_ga':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/interactive_la':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/intelligent_csa':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/intelligent_naps':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/lesson_pga':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/online_hca':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/debate_ma':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/database_fga':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/syllabus_ga':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/industry_kba':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/stratified_pq':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/personalized_la':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/health_manager':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/rd_a':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/treatment_manager':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/car_manager':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/virtuallearning_manager':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/backup':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/statistics_manager':{
				target: 'http://192.168.1.18:1819',
				changeOrigin: true,
			},
			'/specialityss':{
				target: 'http://192.168.1.18:1819',
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
