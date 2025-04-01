<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" :isExport="isExport" :isAdd='isAdd' :isToggle="isToggle" :selectData="selectData"/>
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :page-change="changePage" :editFunc="handleEdit" :isSelection='isSelection' @sendMessage="handleSendMessage">
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
      <el-collapse-item title="用户信息" name="1">
        <div>
           
            <p class="viewP">
                <span>
                    用户名称： 
                </span>
                {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    账号： 
                </span>
               {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    密码： 
                </span>
                {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    注册时间： 
                </span>
                {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    最后登录时间： 
                </span>
                {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    开启/停用： 
                </span>
                {{viewData.row.name}}
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
import { User } from '@/types/user';
import { fetchUserData } from '@/api';
import TableCustom from '@/components/table-custom.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
const activeNames = ref(['1'])
const isSelection = ref(true)
// 查询相关
const query = reactive({
    name: '',
    date:'',
    finallyDate:'',
    isAble:'启用'
});

const isExport=ref(true)
const isToggle = ref(true)
const isAdd= ref(false)
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '用户名称', prop: 'name',placeholder:'请输入用户名称'},
    { type: 'datetime', label: '注册时间', prop: 'date',placeholder:'请选择注册时间'  },
    { type: 'datetime', label: '最后登陆时间', prop: 'finallyDate',placeholder:'请选择最后登陆时间' },
    { type: 'select', label: '启用/停用', prop: 'isAble',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择启用/停用'},



])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 'name', label: '用户名称' },
    { prop: 'phone', label: '学号' },
    { prop: 'role', label: '注册时间' },
    { prop: 'role', label: '最后登陆时间' },
    { prop: 'isAble', label: '启用/停用' },
    { prop: 'operator', label: '操作', width: 250,operatorType:['view','ToggleStart'] },
])
const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<User[]>([]);
const getData = async () => {
    const res = await fetchUserData()
    tableData.value = res.data.list;
    page.total = res.data.pageTotal;
};
getData();

const changePage = (val: number) => {
    page.index = val;
    getData();
};
const selectData =ref<User[]>([])
const handleSendMessage=(message)=>{
    selectData.value=message
}
// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', label: '用户名', prop: 'name', required: true },
        { type: 'input', label: '手机号', prop: 'phone', required: true },
        { type: 'input', label: '密码', prop: 'password', required: true },
        { type: 'input', label: '邮箱', prop: 'email', required: true },
        { type: 'input', label: '角色', prop: 'role', required: true },
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
    row: {},
    list: []
});
const handleView = (row: User) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '用户ID',
        },
        {
            prop: 'name',
            label: '用户名',
        },
        {
            prop: 'password',
            label: '密码',
        },
        {
            prop: 'email',
            label: '邮箱',
        },
        {
            prop: 'phone',
            label: '电话',
        },
        {
            prop: 'role',
            label: '角色',
        },
        {
            prop: 'date',
            label: '注册日期',
        },
    ]
    visible1.value = true;
};

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
</style>