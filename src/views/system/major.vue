<template>
    <div>
        <TableSearch
      :query="query"
      :options="searchOpt"
      :search="handleSearch"
      :toggle="handleBatchDel"
      @toggleAdd="handleToggleAdd"
      :isExport="isExport"
      :isAdd="isAdd"
      :isToggle="isToggle"
      :selectData="selectData"
    />
        <div class="container">
            <TableCustom :columns="columns" :currentPage="currentPage" :tableData="tableData" :total="pageList.total" :viewFunc="handleView"
                :delFunc="handleDelete" @changePage="changePage" :editFunc="handleEdit" :isSelection='isSelection' @sendMessage="handleSendMessage" >
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
                    校区名称： 
                </span>
                {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    创建时间： 
                </span>
               {{viewData.row.name}}
            </p>
            <p class="viewP">
                <span>
                    启用/停用:
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
import { specialityListApi, specialityAddApi,specialityDelApi,specialityAllDelApi} from "../../api/index";
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
const isToggle = ref(true)
const isAdd= ref(true)
const searchOpt = ref<FormOptionList[]>([
    // { type: 'input', label: '专业名称：', prop: 'name',placeholder:'请输入专业名称'},
    // { type: 'select', label: '所属校区：', prop: 'name2',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择所属校区'},
    // { type: 'select', label: '所属学院：', prop: 'name3',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择所属学院'},
    // { type: 'select', label: '学制：', prop: 'name4',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择学制'},

    // { type: 'select', label: '启用/停用', prop: 'isAble',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择启用/停用'},



])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { prop: 's_speciality', label: '专业名称' },
    { prop: 'paths', label: '路径' },
    { prop: 'paths_name', label: '路径名称' },

    
    { prop: 'created_at', label: '创建时间' },
   

    { prop: 'operator', label: '操作', width: 250,operatorType:['Delete'] },
])
const pageList = reactive({
    page: 1,
  limit: 10,
  total: 0,
})
const tableData = ref<User[]>([]);
    const extractDateFormat = (date) => {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return formattedDate;
};
const getData = async () => {
  await request
    .get(specialityListApi, { data: pageList })
    .then((response) => {
      console.log("响应数据:", response);
      const {
        message,
        data: { items, total },
        code,
      } = response;
      if (code == 200) {
        items.forEach((element) => {
          if (element.created_at) {
            element.created_at = extractDateFormat(element.created_at);
          }
          //  element.is_deleted = element.is_deleted?'停用':'启用'
        });
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
  currentPage.value = val;
  pageList.page = val;
  getData();
};

const handleToggleAdd=(message)=>{
    console.log(message,'message')
    isEdit.value=false
    visible.value=message
}

// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 24,
    list: [
        { type: 'input', label: '专业名称', prop: 's_speciality', required: true },
        { type: 'input', label: '路径', prop: 'paths', required: true },
        { type: 'input', label: '路径名称', prop: 'paths_name', required: true },


      
       
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
const addFunction = async (me) => {
  console.log(me, "rowData.value");
  await request
    .post(specialityAddApi, me)
    .then((response) => {
      console.log("响应数据:", response);
      closeDialog();
        getData();
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
const updateData = (me) => {
  addFunction(me);
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

// 删除函数
const deleFunction = async (id) => {
  await request
    .delete(specialityDelApi+id)
    .then((response) => {
      console.log("响应数据:", response);
      const {code,message} = response
      if (code==200){
        ElMessage({
          message: message,
          type: "success",
          onClose:function(){
            getData();
          }
        });
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
// 删除相关
const handleDelete = (row: Role) => {
  const {s_id} = row
  deleFunction(s_id)
};
const selectData = ref<User[]>([]);
const handleSendMessage = (message) => {
  selectData.value = message;
};
// 批量删除函数
const batchDeleFunction = async () => {
const delArray = []
selectData.value.forEach(ele=>{
    delArray.push(ele.s_id)
})
  await request
    .delete(specialityAllDelApi, {
    headers: {
      'Content-Type': 'application/json'
    },
    data:delArray})
    .then((response) => {
      console.log("响应数据:", response);
      const {code,message} = response
      if (code==200){
        ElMessage({
          message: message,
          type: "success",
          onClose:function(){
            getData();
          }
        });
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
const handleBatchDel=()=>{
    console.log('切换')
    batchDeleFunction()
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