<template>
    <div>
        <!-- <TableSearch :query="query" :options="searchOpt" @toggleAdd='handleToggleAdd' :search="handleSearch" :isExport="isExport" :isAdd='isAdd' :isToggle="isToggle" :selectData="selectData"/> -->
        <div class="container">
            <TableCustom :columns="columns" :currentPage="currentPage"  :tableData="tableData" :total="pageList.total" :viewFunc="handleView"
                :delFunc="handleDelete" @changePage="changePage" :editFunc="handleEdit" :isSelection='isSelection' @cellData="getCellData" @sendMessage="handleSendMessage">
                <!-- <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template> -->
            </TableCustom>

        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
        </el-dialog>
        <el-dialog title="查看用户" v-model="visible1" width="700px" destroy-on-close>
            <div class="demo-collapse">
    <el-collapse v-model="activeNames" >
      <el-collapse-item :title="viewData.name" name="1">
        <div>
           
            <p class="viewP">
                <span>
                    {{ viewData.name }} :
                </span>
                {{viewData.content}}
            </p>
          
            
        </div>
       
      </el-collapse-item>
      
    </el-collapse>
  </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive,toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { User,DialogueData } from '@/types/user';
import { fetchUserData } from '@/api';
import TableCustom from '@/components/table-custom.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { languageApi} from "../../api/index";
import request from "../../utils/request";


const activeNames = ref(['1'])
const isSelection = ref(true)
// 查询相关
const query = reactive({
    name: '',
    date:'',
    finallyDate:'',
    isAble:'启用'
});

const isExport=ref(false)
const isToggle = ref(false)
const isAdd= ref(false)
const searchOpt = ref<FormOptionList[]>([
    { type: 'select', label: '消息类型', prop: 'isAble',opts:[{label:"图片",value:'1'},{label:"文字",value:'2'},{label:"视频",value:'2'}],placeholder:'请选择启用/停用'},



])

const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'users', label: '用户名' },

    { prop: 'names', label: '用户输入内容' },
    { prop: 'introduction', label: 'AI响应内容' },
    { prop: 'type', label: '消息类型' },
    { prop: 'conversation_id', label: '上下文ID' },

])

const pageList = reactive({
    page: 1,
  limit: 10,
  total: 0,
})
const tableData = ref<DialogueData[]>([]);
const getData = async () => {
    await request
    .get(languageApi, { params: pageList })
    .then((response) => {
      console.log("响应数据:", response);
      const {
        message,
        data: { items, total },
        code,
      } = response;
      if (code == 200) {
        items.forEach(ele=>{
            if (ele.inputs.type){
                ele.type=ele.inputs.type
            }
        })
        tableData.value = items;
        pageList.total = total;
      }
    })
    .catch((error) => {
      console.log("请求出错:", error);
      const { message, code } = error.response.data;
      if (code == 409) {
        ElMessage({
          message: message,
          type: "error",
        });
      } else {
        ElMessage({
          message: error.response.data,
          type: "error",
        });
      }
    });
   
};
getData();
const currentPage = ref(1);

const changePage = (val: number) => {
    console.log(val,'=-=-=-=-=-')
    currentPage.value = val;
  pageList.page = val;
  getData();
};
const selectData =ref<User[]>([])
const handleSendMessage=(message)=>{
    selectData.value=message
}
const handleToggleAdd=(message)=>{
    console.log(message,'message')
    isEdit.value=false
    visible.value=message
}
const getCellData=(message)=>{
    console.log('-==-==-=-=-=-=-=')
    visible1.value=true
    viewData.value = message
console.log(message,'获取单元格的内容')
}
// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 24,
    list: [
        { type: 'input', label: '学院名称', prop: 'name', required: true },
        { type: 'textarea', label: '学院描述', prop: 'phone', required: true },
        { type: 'switch', label: '启用/停用', prop: 'password', required: true },
       
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: User) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = () => {
    closeDialog();
    getData();
};

const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    name:'',
    content:''
});


// 删除相关
const handleDelete = (row: User) => {
    ElMessage.success('删除成功');
}
</script>

<style scoped>

.viewP{
    display: flex
;
    justify-content: center;
    font-family: OPPOSans;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    letter-spacing: -0.01px;
    color: #000000;
    margin-top: 10px;
}
.viewP span{
    width:100px;
    text-align: right;
}
/* 隐藏默认箭头 */
.el-dropdown__caret-button::after {
  display: none;
}


</style>