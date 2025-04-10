<template>
  <div>
    <TableSearch
      :query="query"
      :options="searchOpt"
      :search="handleSearch"
      :toggle="handleBatchDel"
      :isExport="isExport"
      :isquery="true"
      :isAdd="isAdd"
      :isToggle="isToggle"
      :export="hanldExport"
      :selectData="selectData"
    />
    <div class="container">
      <TableCustom
        :columns="columns"
        :currentPage="currentPage"
        :tableData="tableData"
        :total="pageList.total"
        :viewFunc="handleView"
        :delFunc="handleDelete"
        @changePage="changePage"
        :editFunc="handleEdit"
        :isSelection="isSelection"
        @sendMessage="handleSendMessage"
      >
        <!-- <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template> -->
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
      title="查看用户"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <div class="demo-collapse">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="用户信息" name="1">
            <div>
              <p class="viewP">
                <span> 用户名称： </span>
                {{ viewData.row.s_name }}
              </p>
              <p class="viewP">
                <span> 账号： </span>
                {{ viewData.row.s_name }}
              </p>
              <p class="viewP">
                <span> 密码： </span>
                {{ viewData.row.s_pass }}
              </p>
              <p class="viewP">
                <span> 注册时间： </span>
                {{ viewData.row.created_at }}
              </p>

              <p class="viewP">
                <span> 开启/停用： </span>
                {{ viewData.row.is_deleted }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { User } from "@/types/user";
import { fetchUserData } from "@/api";
import TableCustom from "@/components/table-custom.vue";
import TableSearch from "@/components/table-search.vue";
import { FormOption, FormOptionList } from "@/types/form-option";
import {
  userListApi,
  oneUserMessageApi,
  studentDelApi,
  studentALLDelApi,
  studentSearchApi,
} from "../../api/index";
import request from "../../utils/request";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

console.log(apiBaseUrl, "VITE_API_BASE_URL");
const activeNames = ref(["1"]);
const isSelection = ref(true);
// 查询相关
const query = reactive({
  s_name: "",
  student_id: "",
});

const isExport = ref(true);
const isToggle = ref(true);
const isAdd = ref(false);
const searchOpt = ref<FormOptionList[]>([
  {
    type: "input",
    label: "用户名称",
    prop: "s_name",
    placeholder: "请输入用户名称",
  },
  {
    type: "input",
    label: "学号",
    prop: "student_id",
    placeholder: "请输入学号",
  },
  // { type: 'datetime', label: '最后登陆时间', prop: 'finallyDate',placeholder:'请选择最后登陆时间' },
  // { type: 'select', label: '启用/停用', prop: 'isAble',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择启用/停用'},
]);
const handleSearch = (type) => {
  console.log(type, "queryqueryqueryqueryquery");
  const allEmpty = Object.values(query).every(
    (value) => value === null || value === undefined || value === ""
  );
  if (allEmpty) {
    pageList.page = 1;
    pageList.limit=10
    getData();
  } else {
    studentSearchFunction();
  }
};
const hanldExport = () => {
  window.location.href = apiBaseUrl + "/Amanager/excel?format=excel";
};
// 表格相关
let columns = ref([
  { type: "index", label: "序号", width: 55, align: "center" },
  { prop: "s_name", label: "用户名称" },
  { prop: "s_student_id", label: "学号" },
  { prop: "created_at", label: "注册时间" },
  { prop: "is_deleted", label: "启用/停用" },
  {
    prop: "operator",
    label: "操作",
    width: 250,
    operatorType: ["view", "ToggleStart", "Delete"],
  },
]);
const pageList = reactive({
  page: 1,
  limit: 10,
  total: 0,
});
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
const tableData = ref<User[]>([]);
const studentSearchFunction = async () => {
  // query.limit==100

  await request
    .get(studentSearchApi, {
      params: query,
    })
    .then((response) => {
      const { data, status } = response;

      if (status == "success") {
        data.forEach((element) => {
          if (element.created_at) {
            element.created_at = extractDateFormat(element.created_at);
          }
          element.is_deleted = element.is_deleted ? "停用" : "启用";
        });
        pageList.page = 1;
        pageList.total = data.length;
        tableData.value = data;
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
const getData = async () => {
  await request
    .get(userListApi, { params: pageList })
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
          element.is_deleted = element.is_deleted ? "停用" : "启用";
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
const getUserMessage = async (id) => {
  await request
    .get(oneUserMessageApi + "/" + id)
    .then((response) => {
      console.log("响应数据:", response);
      if (response.created_at) {
        response.created_at = extractDateFormat(response.created_at);
      }
      response.is_deleted = response.is_deleted ? "停用" : "启用";

      viewData.value.row = response;
      console.log(viewData.value.row, "=====================");
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
  console.log(val, "opopopopopo");
  currentPage.value = val;
  pageList.page = val;
  getData();
};
const selectData = ref<User[]>([]);
const handleSendMessage = (message) => {
  selectData.value = message;
};
// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: "100px",
  span: 12,
  list: [
    { type: "input", label: "用户名", prop: "name", required: true },
    { type: "input", label: "手机号", prop: "phone", required: true },
    { type: "input", label: "密码", prop: "password", required: true },
    { type: "input", label: "邮箱", prop: "email", required: true },
    { type: "input", label: "角色", prop: "role", required: true },
  ],
});
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
  list: [],
});
// 查看相关
const handleView = (row: User) => {
  console.log(row, "row");
  const { s_id } = row;
  getUserMessage(s_id);
  visible1.value = true;
};
// 删除函数
const deleFunction = async (id) => {
  await request
    .delete(studentDelApi + id)
    .then((response) => {
      console.log("响应数据:", response);
      const { code, message } = response;
      if (code == 200) {
        ElMessage({
          message: message,
          type: "success",
          onClose: function () {
            getData();
          },
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
const handleDelete = (row: User) => {
  const { s_id } = row;
  deleFunction(s_id);
};
// 批量删除函数
const batchDeleFunction = async () => {
  const delArray = [];
  selectData.value.forEach((ele) => {
    delArray.push(ele.s_id);
  });
  await request
    .delete(studentALLDelApi, {
      headers: {
        "Content-Type": "application/json",
      },
      data: delArray,
    })
    .then((response) => {
      console.log("响应数据:", response);
      const { code, message } = response;
      if (code == 200) {
        ElMessage({
          message: message,
          type: "success",
          onClose: function () {
            getData();
          },
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
const handleBatchDel = () => {
  console.log("切换");
  batchDeleFunction();
};
</script>

<style scoped>
.viewP {
  display: flex;
  justify-content: center;
  font-family: OPPOSans;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  letter-spacing: -0.01px;
  color: #000000;
  margin-top: 10px;
}
.viewP span {
  width: 100px;
  text-align: right;
}
</style>
