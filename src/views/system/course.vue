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
      </TableCustom>
    </div>
    <el-dialog
      :title="isEdit ? '编辑' : '添加课程'"
      v-model="visible"
      width="900px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item
          title="添加课程"
          name="1"
          style="border-bottom: 0px solid"
          id="collapse"
        >
          <div style="margin-top: 10px">
            <el-form label-position="right" label-width="90px" :model="form" :rules="rules"  ref="formRef">
              <el-form-item label="课程名称"  prop="name">
                <el-input v-model="form.name" placeholder="请输入课程名称" />
              </el-form-item>
              <el-form-item label="类型"  prop="type">
                <el-select v-model="form.type" placeholder="请选择类型">
                  <el-option label="通识课" value="通识课" />
                  <el-option label="必修课" value="必修课" />
                </el-select>
              </el-form-item>
              <el-form-item label="上传文件" required>
                <el-upload
                  :file-list="fileList"
                  :auto-upload="false"
                  :on-change="handleChange"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :on-progress="handleProgress"
                  :showFileList="false"
                  drag
                  style="width: 100%"
                >
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div
                    style="font-size: 16px; font-weight: 500; color: #111827"
                  >
                    将文件拖拽到此处，或点击上传
                  </div>
                  <div>单个文件大小不超过 20MB,支持 PDF等格式</div>
                </el-upload>
              </el-form-item>
            </el-form>
            <h3>上传列表</h3>
            <el-table :data="fileList" style="width: 100%; margin-top: 20px">
              <el-table-column label="文件名" prop="name">
                <template #default="{ row }">
                  <el-icon style="color: red"><Document /></el-icon>
                  <span style="margin-left: 8px">{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="大小" prop="size">
                <template #default="{ row }">
                  {{ (row.size / 1024 / 1024).toFixed(1) }} MB
                </template>
              </el-table-column>
              <el-table-column label="状态" width="400px">
                <template #default="{ row }">
                  <el-progress
                    :percentage="progress"
                    style="height: 6px !important"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ $index }">
                  <el-button
                    @click="handleDeleCourse($index)"
                    type="link"
                    :icon="Delete"
                    style="font-size: 18px; color: red"
                  />
                </template>
              </el-table-column>
            </el-table>
            <div class="actions" style="text-align: center; margin-top: 10px">
              <el-button @click="onCancel">取消</el-button>
              <el-button type="primary" @click="onSave">保存</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  
  </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive, toRefs } from "vue";
import { ElMessage, ElProgress, ElMessageBox } from "element-plus";
import {
  CirclePlusFilled,
  Document,
  Delete,
  UploadFilled,
} from "@element-plus/icons-vue";
import { User } from "@/types/user";
import { fetchUserData } from "@/api";
import TableCustom from "@/components/table-custom.vue";
import TableSearch from "@/components/table-search.vue";
import { FormOption, FormOptionList } from "@/types/form-option";
import type { UploadProgressEvent, FormInstance, FormRules } from "element-plus";
import {
  specialityListApi,
  specialityAddApi,
  specialityDelApi,
  specialityAllDelApi,
  classesApi,
  classesListApi,
  classesDeleteApi,
} from "../../api/index";
import request from "../../utils/request";
const activeNames = ref(["1"]);
const isSelection = ref(true);
const formRef = ref<FormInstance>();
const form = ref({
  name: "",
  type: "",
});

const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入课时名称', trigger: 'blur' },
    { min: 1, max: 16, message: '用户名长度在 1 到 16 个字符之间', trigger: 'blur' },
    { 
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, 
    message: '课时名称只能包含字母、数字和中文',
    trigger: 'blur',
    validator(rule, value, callback) {
        console.log('开始校验', value); 
        if (!value) {
            return callback(new Error('请输入课时名称'));
        }
        if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
            return callback(new Error('课时名称只能包含字母、数字和中文'));
        }
        callback();
    }
    }
  ],
  type: [
    { required: true, message: '请选择类型', trigger: 'change' },
  ]
});
const typeOptions = [
  { label: "类型1", value: "1" },
  { label: "类型2", value: "2" },
];
interface UploadFile {
  name: string;
  size: number;
  percentage?: number;
}

const fileList = ref<UploadFile[]>([]);
const progress = ref(50);
const startUpload = () => {
  progress.value = 0;

  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 10;
    } else {
      clearInterval(interval);
    }
  }, 500);
};
function handleChange(file: any, fileList_: any[]) {
  console.log(fileList.value, "-0-0-0-0-0-0-0-0-0-0-");
  if (fileList.value.length > 0) {
    ElMessage({
      message: "课程文件只能上传一个,请删除原有课程文件！",
      type: "error",
      onClose: function () {},
    });
  } else {
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      ElMessage.error("文件大小不能超过20MB");
      return false;
    }
    // 模拟进度
    file.percentage = 50;
    console.log(fileList_, file, "222222");
    fileList.value = fileList_;
    startUpload();
  }
}
const handleProgress = (event: UploadProgressEvent, file: File) => {
  console.log(event, "event");
  console.log(file, "file");

  if (event.total) {
    progress.value = Math.round((event.loaded / event.total) * 100);
  }
};
function handleRemove(file: any, fileList_: any[]) {
  fileList.value = fileList_;
}

function removeFile(index: number) {
  fileList.value.splice(index, 1);
}

function beforeUpload(file: File) {
  const isLt20M = file.size / 1024 / 1024 < 20;
  if (!isLt20M) {
    ElMessage.error("文件大小不能超过20MB");
    return false;
  }
  startUpload();
  return true;
}

const handleDeleCourse = (index) => {
  ElMessageBox.confirm("是否确认删除此条课程文件?", "确认", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
        onClose: function () {
          fileList.value = [];
        },
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
    });
};
function onCancel() {
  resetForm()
  visible.value = false;

  // 取消逻辑
}
const resetForm = (()=>{
  fileList.value=[];
  form.value.name='';
  form.value.type='';

})
function onSave() {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (fileList.value.length=='0') {
        ElMessage({
          message: '请上传课程文件',
          type: "error",
          onClose: function () {
          },
        });
      }
      const formData = new FormData();
  console.log(fileList._rawValue[0].raw, "fileListfileListfileListfileList");
  formData.append("file", fileList._rawValue[0].raw);
  request
    .post(
      classesApi + "?filesname=" + form.value.name + "&type=" + form.value.type,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log("响应数据:", response);
      ElMessage({
        message: "保存成功",
        type: "success",
        onClose: function () {
          resetForm()
          visible.value = false;
          getData();
        },
      });
    })
    .catch((error) => {
      console.log("请求出错:", error);
      const { message, code } = error.response.data;
      if (code == 409) {
        ElMessage({
          message: message,
          type: "error",
          onClose: function () {
            visible.value = false;
          },
        });
      } else {
        ElMessage({
          message: error.response.data,
          type: "error",
          onClose: function () {
            visible.value = false;
          },
        });
      }
    });
    } else {
      ElMessage({
          message: '表单验证失败，请检查输入内容！',
          type: "error",
          onClose: function () {
          },
        });
    }
  });
  
}
// 查询相关
const query = reactive({
  name: "",
  date: "",
  finallyDate: "",
  isAble: "启用",
});

const isExport = ref(false);
const isToggle = ref(true);
const isAdd = ref(true);
const searchOpt = ref<FormOptionList[]>([
  // { type: 'datetime', label: '上传时间', prop: 'name',placeholder:'请选择上传时间'},
  // { type: 'select', label: '所属校区：', prop: 'name2',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择所属校区'},
  // { type: 'select', label: '所属学院：', prop: 'name3',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择所属学院'},
  // { type: 'select', label: '学制：', prop: 'name4',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择学制'},
  // { type: 'select', label: '启用/停用', prop: 'isAble',opts:[{label:"启用",value:'1'},{label:"停用",value:'2'}],placeholder:'请选择启用/停用'},
]);
const handleSearch = () => {
  changePage(1);
};

// 表格相关
let columns = ref([
  { type: "index", label: "序号", width: 55, align: "center" },
  { prop: "filename", label: "课程名称" },
  { prop: "class_types", label: "类型" },
  { prop: "filename", label: "文件名称" },
  { prop: "upload_time", label: "上传时间" },
  { prop: "operator", label: "操作", width: 250, operatorType: ["Delete"] },
]);
const pageList = reactive({
  page: 1,
  limit: 10,
  total: 0,
});
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
    .get(classesListApi, { data: pageList })
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
let options = ref<FormOption>({
  labelWidth: "100px",
  span: 24,
  list: [
    { type: "input", label: "专业名称", prop: "s_speciality", required: true },
    { type: "input", label: "路径", prop: "paths", required: true },
    { type: "input", label: "路径名称", prop: "paths_name", required: true },
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

const handleView = (row: User) => {
 
  visible1.value = true;
};

// 删除函数
const deleFunction = async (id) => {
  await request
    .post(classesDeleteApi + "?s_id=" + id)
    .then((response) => {
      console.log("响应数据:", response);
      const { status, message } = response;
      if (status == "删除成功") {
        ElMessage({
          message: status,
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
const handleDelete = (row: Role) => {
  const { s_id } = row;
  deleFunction(s_id);
};
const selectData = ref<User[]>([]);
const handleSendMessage = (message) => {
  selectData.value = message;
};
// 批量删除函数
const batchDeleFunction = async () => {
  const delArray = [];
  selectData.value.forEach((ele, index) => {
    delArray.push("s_id=" + ele.s_id);
  });
  // const result2 = delArray.map(item => s_id=${item}).join('&');
  await request
    .post(classesDeleteApi + "?" + delArray.join("&"), {
      headers: {
        "Content-Type": "application/json",
      },
      data: delArray,
    })
    .then((response) => {
      console.log("响应数据:", response);
      const { status, message } = response;
      if (status == "删除成功") {
        ElMessage({
          message: status,
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
#collapse ::v-deep .el-collapse-item__wrap {
  border-bottom: 0px solid !important;
}
.el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
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
