<template>
	<el-config-provider :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useThemeStore } from './store/theme';

const theme = useThemeStore();
theme.initTheme();
</script>
<style>
@import './assets/css/main.css';
.el-collapse-item__header{
    background: #E0EAFF !important;
    text-indent: 10px !important;
    font-family: OPPOSans !important;
font-size: 16px !important;
font-weight: bold !important;
line-height: 22px !important;
height: 36px  !important;
color: #FFFFFF !important;
}
</style>
