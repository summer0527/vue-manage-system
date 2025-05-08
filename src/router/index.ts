import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from 'axios';
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '用户行为统计',
                    noAuth: true,
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/system-user',
                name: 'system-user',
                meta: {
                    title: '用户管理',
                    permiss: '11',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-user" */ '../views/system/user.vue'),
            },
            {
                path: '/system-role',
                name: 'system-role',
                meta: {
                    title: '用户画像管理',
                    permiss: '12',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-role" */ '../views/system/role.vue'),
            },
            {
                path: '/system-compus',
                name: 'system-compus',
                meta: {
                    title: '学校管理',
                    permiss: '13',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-compus" */ '../views/system/compus.vue'),
            },
            {
                path: '/system-collage',
                name: 'system-collage',
                meta: {
                    title: '学院管理',
                    permiss: '31',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-collage" */ '../views/system/collage.vue'),
            },
            {
                path: '/system-major',
                name: 'system-major',
                meta: {
                    title: '专业管理',
                    permiss: '31',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-major" */ '../views/system/major.vue'),
            },
            {
                path: '/system-dialogue',
                name: 'system-dialogue',
                meta: {
                    title: '对话记忆列表',
                    permiss: '32',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-dialogue" */ '../views/system/dialogue.vue'),
            },
            {
                path: '/system-translate',
                name: 'system-translate',
                meta: {
                    title: '翻译列表',
                    permiss: '33',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-translate" */ '../views/system/translate.vue'),
            },
            {
                path: '/system-code',
                name: 'system-code',
                meta: {
                    title: '代码生成助手',
                    permiss: '34',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-code" */ '../views/system/code.vue'),
            },
            {
                path: '/system-class',
                name: 'system-class',
                meta: {
                    title: '课堂互助问答',
                    permiss: '35',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-class" */ '../views/system/class.vue'),
            },
            {
                path: '/system-customer',
                name: 'system-customer',
                meta: {
                    title: '智能客服助手',
                    permiss: '36',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-customer" */ '../views/system/customer.vue'),
            },
            {
                path: '/system-guidance',
                name: 'system-guidance',
                meta: {
                    title: '智能导诊与患者服务',
                    permiss: '37',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-guidance" */ '../views/system/guidance.vue'),
            },
            {
                path: '/system-teacher',
                name: 'system-teacher',
                meta: {
                    title: '教案生成助手',
                    permiss: '38',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-teacher" */ '../views/system/teacher.vue'),
            },
            {
                path: '/system-physical',
                name: 'system-physical',
                meta: {
                    title: '线上体检助手',
                    permiss: '39',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-physical" */ '../views/system/physical.vue'),
            },
            {
                path: '/system-man',
                name: 'system-man',
                meta: {
                    title: '辩论主持人助手',
                    permiss: '40',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-man" */ '../views/system/man.vue'),
            },
            {
                path: '/system-sql',
                name: 'system-sql',
                meta: {
                    title: '数据表字段生成助手',
                    permiss: '41',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-sql" */ '../views/system/sql.vue'),
            },
            {
                path: '/system-gang',
                name: 'system-gang',
                meta: {
                    title: '教学大纲生成助手',
                    permiss: '42',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-gang" */ '../views/system/gang.vue'),
            },
            {
                path: '/system-knowledge',
                name: 'system-knowledge',
                meta: {
                    title: '行业知识库助手',
                    permiss: '43',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-knowledge" */ '../views/system/knowledge.vue'),
            },
            {
                path: '/system-subject',
                name: 'system-subject',
                meta: {
                    title: '分层练习题助手',
                    permiss: '44',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-subject" */ '../views/system/subject.vue'),
            },
            {
                path: '/system-lean',
                name: 'system-lean',
                meta: {
                    title: '个性化学习助手',
                    permiss: '45',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-lean" */ '../views/system/lean.vue'),
            },
            {
                path: '/system-qa',
                name: 'system-qa',
                meta: {
                    title: '研发问答助手',
                    permiss: '46',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-qa" */ '../views/system/qa.vue'),
            },
            {
                path: '/system-health',
                name: 'system-health',
                meta: {
                    title: '心里健康支持助手',
                    permiss: '47',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-health" */ '../views/system/health.vue'),
            },
            {
                path: '/system-car',
                name: 'system-car',
                meta: {
                    title: '汽车故障检修助手',
                    permiss: '48',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-car" */ '../views/system/car.vue'),
            },
            {
                path: '/system-virtuallearning',
                name: 'system-virtuallearning',
                meta: {
                    title: '虚拟学习伙伴助手',
                    permiss: '49',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-virtuallearning" */ '../views/system/virtuallearning.vue'),
            },
            {
                path: '/system-treatment',
                name: 'system-treatment',
                meta: {
                    title: '治疗虚拟教学培训助手',
                    permiss: '50',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-treatment" */ '../views/system/treatment.vue'),
            },
            {
                path: '/system-dataCopy',
                name: 'system-dataCopy',
                meta: {
                    title: '数据备份',
                    permiss: '51',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-dataCopy" */ '../views/system/dataCopy.vue'),
            },
            {
                path: '/system-course',
                name: 'system-course',
                meta: {
                    title: '课程管理',
                    permiss: '52',
                    requiresAuth:true
                },
                component: () => import(/* webpackChunkName: "system-course" */ '../views/system/course.vue'),
            },
            
            {
                path: '/ucenter',
                name: 'ucenter',
                meta: {
                    title: '个人中心',
                    requiresAuth:true

                },
                component: () => import(/* webpackChunkName: "ucenter" */ '../views/pages/ucenter.vue'),
            },
           
            {
                path: '/theme',
                name: 'theme',
                meta: {
                    title: '主题设置',
                    permiss: '7',
                },
                component: () => import(/* webpackChunkName: "theme" */ '../views/pages/theme.vue'),
            },
           
          
        ],
    },
    {
        path: '/login',
        name:'Login',
        meta: {
            title: '登录',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue'),
    },
    {
        path: '/register',
        name:'Register',
        meta: {
            title: '注册',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "register" */ '../views/pages/register.vue'),
    },
    {
        path: '/reset-pwd',
        name:'Resetpwd',
        meta: {
            title: '重置密码',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/pages/reset-pwd.vue'),
    },
    {
        path: '/403',
        meta: {
            title: '没有权限',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/pages/403.vue'),
    },
    {
        path: '/404',
        meta: {
            title: '找不到页面',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
    },
    { path: '/:path(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
let intervalId;
const freshTokenFunction=async()=>{
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken,'refreshTokenrefreshTokenrefreshTokenrefreshTokenrefreshToken')
    const token = localStorage.getItem('token');
    const configt = {

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization":`Bearer ${token}`
        },
      };
    const { data } =  await axios.post('/Amanager/refresh', { refresh_token:refreshToken},configt);  
    console.log(data.access_token,'access_token')
    console.log(data.refresh_token,'refresh_token')


    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
}
router.beforeEach((to, from, next) => {
    NProgress.start();
    const isAuthenticated = localStorage.getItem('token'); 
    const role = localStorage.getItem('s_name');
    const permiss = usePermissStore();
    if (to.meta.requiresAuth) {
        if (!intervalId) {
            intervalId = setInterval(freshTokenFunction, 3500000);
        }
    } else {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    if (to.name !== 'Login'&&to.name !== 'Register'&&to.name !== 'Resetpwd' && !isAuthenticated) {
        next('/login');
    } else if ((to.name == 'Register'||to.name=='Resetpwd') && !isAuthenticated) {
        next();
    } else if (to.name === 'Login' && isAuthenticated){
        next({ name: 'Home' }); 
    }else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
