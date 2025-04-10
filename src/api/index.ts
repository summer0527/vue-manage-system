import request from '../utils/request';
export const registerApi:string ='/Amanager/register'
export const loginApi:string ='/Amanager/token'
export const loginUserApi:string ='/Amanager/users/me'
export const loginOut:string ='/Amanager/logout'
export const userListApi:string ='/Amanager/student_list'
export const oneUserMessageApi:string ='/Amanager/student_one'
export const studentDelApi:string ='/Amanager/student_del/'
export const studentALLDelApi:string ='/Amanager/student_alldelete'
export const portraitListApi:string ='/Amanager/portrait_list'
export const portraitAddApi:string ='/Amanager/portrait_add'
export const portraitDelApi:string ='/Amanager/portrait_del/'
export const portraitAllDelApi:string ='/Amanager/portrait_alldelete'
export const studentSearchApi:string ='/Amanager/student_search'


// 个人中心
export const userMessageApi:string ='/personal_center/personal_one/'
export const userMessageUpdateApi:string ='/personal_center/personal_update/'
export const userPicTApi:string ='/personal_center/personal_updatepic/'
// 学院管理
export const collegeListApi:string ='/Amanager/college_list'
export const collegeAddApi:string ='/Amanager/college_add'
export const collegeDelApi:string ='/Amanager/college_del/'
export const collegeAllDelApi:string ='/Amanager/college_alldelete'
// 专业管理
export const specialityListApi:string ='/Amanager/speciality_list'
export const specialityAddApi:string ='/Amanager/speciality_add'
export const specialityDelApi:string ='/Amanager/speciality_del/'
export const specialityAllDelApi:string ='/Amanager/speciality_alldelete'
// 学校管理
export const schoolListApi:string ='/Amanager/school_info_list'
export const schoolAddApi:string ='/Amanager/school_info_manager_add'
export const schoolDelApi:string ='/Amanager/school_info_del/'
export const schoolAllDelApi:string ='/Amanager/school_info_alldelete'
export const queryCollegeApi:string ='/Amanager/college'
export const querySpecialitiesApi:string ='/Amanager/specialities'
// 对话管理
export const dialogueApi:string ='/dialogue/portrait_list'
export const languageApi:string ='/language/portrait_list'










export const fetchData = () => {
    return request({
        url: './mock/table.json',
        method: 'get'
    });
};

export const fetchUserData = () => {
    return request({
        url: './mock/user.json',
        method: 'get'
    });
};

export const fetchRoleData = () => {
    return request({
        url: './mock/role.json',
        method: 'get'
    });
};
