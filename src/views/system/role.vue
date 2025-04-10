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
      <TableCustom
      :currentPage="currentPage"

        :columns="columns"
        :tableData="tableData"
        :total="pageList.total"
        :viewFunc="handleView"
        :delFunc="handleDelete"
         @changePage="changePage"
        :editFunc="handleEdit"
         @sendMessage="handleSendMessage"
      >
        <template #toolbarBtn>
          <el-button
            type="warning"
            :icon="CirclePlusFilled"
            @click="visible = true"
            >新增</el-button
          >
        </template>
        <template #status="{ rows }">
          <el-tag type="success" v-if="rows.status">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
        <template #permissions="{ rows }">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handlePermission(rows)"
            >管理</el-button
          >
        </template>
      </TableCustom>
    </div>
    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      v-model="visible"
      width="700px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit
        :form-data="rowData"
        :options="options"
        :edit="isEdit"
        :update="updateData"
      />
    </el-dialog>
    <el-dialog
      title="查看详情"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <TableDetail :data="viewData">
        <template #status="{ rows }">
          <el-tag type="success" v-if="rows.status">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </TableDetail>
    </el-dialog>
    <el-dialog
      title="权限管理"
      v-model="visible2"
      width="500px"
      destroy-on-close
    >
      <RolePermission :permiss-options="permissOptions" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="system-role">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Role } from "@/types/role";
import { fetchRoleData } from "@/api";
import TableCustom from "@/components/table-custom.vue";
import TableDetail from "@/components/table-detail.vue";
import RolePermission from "./role-permission.vue";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { FormOption, FormOptionList } from "@/types/form-option";
import { User } from "@/types/portrait";

import { portraitListApi, portraitAddApi,portraitDelApi,portraitAllDelApi} from "../../api/index";
import request from "../../utils/request";
// 查询相关
const query = reactive({
  s_portrait_role: "",
  created_at: "",
});
const searchOpt = ref<FormOptionList[]>([
//   {
//     type: "select",
//     label: "用户画像类型：",
//     prop: "s_portrait_role",
//     placeholder: "请输入用户画像类型：",
//     opts: [
//       { label: "学生", value: "1" },
//       { label: "教师", value: "2" },
//     ],
//   },
//   {
//     type: "datetime",
//     label: "创建时间：",
//     prop: "created_at",
//     placeholder: "请选择创建时间",
//   },
//   {
//     type: "select",
//     label: "启用/停用",
//     prop: "isAble",
//     opts: [
//       { label: "启用", value: "1" },
//       { label: "停用", value: "2" },
//     ],
//     placeholder: "请选择启用/停用",
//   },
]);
const handleSearch = () => {
  changePage(1);
};

// 表格相关
let columns = ref([
  { type: "index", label: "序号", width: 55, align: "center" },
  { prop: "s_portrait_role", label: "用户画像类型" },
  { prop: "created_at", label: "创建时间" },
  {
    prop: "operator",
    label: "操作",
    width: 250,
    operatorType: ["Delete"],
  },
]);
const pageList = reactive({
  page: 1,
  limit: 10,
  total: 0,
});
const tableData = ref<Role[]>([]);
// const getData = async () => {
//     const res = await fetchRoleData()
//     tableData.value = res.data.list;
//     page.total = res.data.pageTotal;
// };
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
    .get(portraitListApi, { data: pageList })
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
const handleToggleAdd = (message) => {
  console.log(message, "message");
  isEdit.value = false;
  visible.value = message;
};
// 新增/编辑弹窗相关
const options = ref<FormOption>({
  labelWidth: "100px",
  span: 24,
  list: [
    {
      type: "input",
      label: "用户画像类型",
      prop: "s_portrait_role",
      required: true,
    },
    {
      type: "input",
      label: "角色标识",
      prop: "s_portrait_class",
      required: true,
    },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const isExport = ref(false);
const isToggle = ref(true);
const isAdd = ref(true);
const handleEdit = (row: Role) => {
  rowData.value = { ...row };
  isEdit.value = true;
  visible.value = true;
};
const addFunction = async (me) => {
  console.log(me, "rowData.value");
  await request
    .post(portraitAddApi, me)
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
  rowData.value = {};
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: [],
  column: 1,
});
const handleView = (row: Role) => {
  viewData.value.row = { ...row };
  viewData.value.list = [
    {
      prop: "id",
      label: "角色ID",
    },
    {
      prop: "name",
      label: "角色名称",
    },
    {
      prop: "key",
      label: "角色标识",
    },
    {
      prop: "status",
      label: "角色状态",
    },
  ];
  visible1.value = true;
};
// 删除函数
const deleFunction = async (id) => {
  await request
    .delete(portraitDelApi+id)
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
    .delete(portraitAllDelApi, {
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
// 权限管理弹窗相关
const visible2 = ref(false);
const permissOptions = ref({});
const handlePermission = (row: Role) => {
  visible2.value = true;
  permissOptions.value = {
    id: row.id,
    permiss: row.permiss,
  };
};
</script>

<style scoped></style>
