<template>
	<div class="search-container">
		<el-form ref="searchRef" :model="query" :inline="true" class="demo-form-inline">
			<el-form-item :label="item.label" :prop="item.prop" v-for="item in options">
				<!-- 文本框、下拉框、日期框 -->
				<el-input v-if="item.type === 'input'" v-model="query[item.prop]" :disabled="item.disabled"
					:placeholder="item.placeholder" clearable></el-input>
				<el-select v-else-if="item.type === 'select'" v-model="query[item.prop]" :disabled="item.disabled"
					:placeholder="item.placeholder" clearable>
					<el-option v-for="opt in item.opts" :label="opt.label" :value="opt.value"></el-option>
				</el-select>
				<el-date-picker v-else-if="item.type === 'date'" type="date" v-model="query[item.prop]"
					:value-format="item.format" :placeholder="item.placeholder"></el-date-picker>
				<el-date-picker v-else-if="item.type === 'datetime'" type="datetime" v-model="query[item.prop]"
					:value-format="item.format" :placeholder="item.placeholder"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :icon="Search" @click="search">查询</el-button>
				<el-button :icon="Refresh" @click="resetForm(searchRef)">重置</el-button>
				<el-button :icon="Refresh" @click="handleAdd" v-show="isAdd">新增</el-button>

				<el-button :icon="Refresh" @click="handleExport(searchRef)" v-show="isExport">导出</el-button>
				<el-button :icon="Refresh" @click="handleToggle(searchRef)" v-show="isToggle">停用/启用</el-button>


			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { Search, Refresh } from '@element-plus/icons-vue';
import { PropType, ref } from 'vue';
import { FormOptionList } from '@/types/form-option';
import { ElMessage } from 'element-plus';

const props = defineProps({
	query: {
		type: Object,
		required: true
	},
	isExport: {
		type: Boolean,
		required: true
	},
	isToggle: {
		type: Boolean,
		required: true
	},
	isAdd:{
		type: Boolean,
		required: true
	},
	selectData:{
		type: Array,
			required: false
	},
	options: {
		type: Array as PropType<Array<FormOptionList>>,
		required: true
	},
	search: {
		type: Function,
		default: () => { }
	}
});
console.log(props.isExport,'isExport')
const searchRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
	props.search();
}
const handleExport=(formEl: FormInstance | undefined)=>{
	if (!formEl) return
	formEl.resetFields()
	props.search();

}
import { defineEmits } from 'vue';

const emit = defineEmits(['toggleAdd']);
const handleAdd=()=>{
	console.log('hahahahahhahah')
	emit('toggleAdd', true);
}
const handleToggle=(formEl: FormInstance | undefined)=>{
	console.log(props.selectData,'===================================')
	if (props.selectData.length==0){
		ElMessage({
              message: '请至少选择一条数据',
              type: "error",
            });
	}

}
</script>

<style scoped>
.search-container {
	padding: 20px 30px 0;
	background-color: #fff;
	margin-bottom: 10px;
	border: 1px solid #ddd;
	border-radius: 5px
}
.demo-form-inline .el-input {
  --el-input-width: 200px;
}

.demo-form-inline .el-select {
  --el-select-width: 200px;
}
</style>
