import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage,ElMessageBox } from "element-plus";
const service: AxiosInstance = axios.create({
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        const isLoginPage = config.url.includes('/Amanager/token');

        const isRegisterPage = config.url.includes('/Amanager/register');
        const isspeciality= config.url.includes('/specialityss/specialities');




        if (!isLoginPage&&!isRegisterPage&&!isspeciality&& token==null) {
            console.log('====================')
            // router.push('/login');
            return Promise.reject(new Error('未登录，请先登录'));
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response.data;
    },
   async error => {
        const { config, response } = error;
      
        if (response && response.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(refreshToken,'refreshTokenrefreshTokenrefreshTokenrefreshTokenrefreshToken')
            const token = localStorage.getItem('token');
            const configt = {
    
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Authorization":`Bearer ${token}`
                },
              };
            const { data } = await axios.post('/api/Amanager/refresh', { refresh_token:refreshToken},configt);  
            console.log(data,'data')
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refreshToken", data.refresh_token);
            if (data.code==201) {

                ElMessage({
                    message: '令牌过期请刷新页面',
                    type: "error",
                    onClose:function () {
                    }
                  });
            }
            
        }
        return Promise.reject(error);
    }
);

export default service;
