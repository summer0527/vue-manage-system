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
