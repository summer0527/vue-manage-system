import request from '../utils/request';
export const registerApi:string ='/api/Amanager/register'
export const loginApi:string ='/api/Amanager/token'
export const loginUserApi:string ='/api/Amanager/users/me'
export const loginOut:string ='/api/Amanager/logout'
export const userListApi:string ='/api/Amanager/student_list'
export const oneUserMessageApi:string ='/api/Amanager/student_one'
export const studentDelApi:string ='/api/Amanager/student_del/'
export const studentALLDelApi:string ='/api/Amanager/student_alldelete'
export const portraitListApi:string ='/api/Amanager/portrait_list'
export const portraitAddApi:string ='/api/Amanager/portrait_add'
export const portraitDelApi:string ='/api/Amanager/portrait_del/'
export const portraitAllDelApi:string ='/api/Amanager/portrait_alldelete'
export const studentSearchApi:string ='/api/Amanager/student_search'


// 个人中心
export const userMessageApi:string ='/api/personal_center/personal_one/'
export const userMessageUpdateApi:string ='/api/personal_center/personal_update/'
export const userPicTApi:string ='/api/personal_center/personal_updatepic/'
// 学院管理
export const collegeListApi:string ='/api/Amanager/college_list'
export const collegeAddApi:string ='/api/Amanager/college_add'
export const collegeDelApi:string ='/api/Amanager/college_del/'
export const collegeAllDelApi:string ='/api/Amanager/college_alldelete'
// 专业管理
export const specialityListApi:string ='/api/Amanager/speciality_list'
export const specialityAddApi:string ='/api/Amanager/speciality_add'
export const specialityDelApi:string ='/api/Amanager/speciality_del/'
export const specialityAllDelApi:string ='/api/Amanager/speciality_alldelete'
// 学校管理
export const schoolListApi:string ='/api/Amanager/school_info_list'
export const schoolAddApi:string ='/api/Amanager/school_info_manager_add'
export const schoolDelApi:string ='/api/Amanager/school_info_del/'
export const schoolAllDelApi:string ='/api/Amanager/school_info_alldelete'
export const queryCollegeApi:string ='/api/Amanager/college'
export const querySpecialitiesApi:string ='/api/Amanager/specialities'
// 对话管理
export const dialogueApi:string ='/api/dialogue/portrait_list'
export const languageApi:string ='/api/language/portrait_list'
export const codeApi:string ='/api/code_ga/coda_api_list'
export const classApi:string ='/api/interactive_la/interactive_la_list'
export const customerApi:string ='/api/intelligent_csa/intelligent_csa_list'
export const guidanceApi:string ='/api/intelligent_naps/intelligent_naps_list'
export const teacherApi:string ='/api/lesson_pga/lesson_pga_list'
export const physicalApi:string ='/api/online_hca/online_hca_list'
export const manApi:string ='/api/debate_ma/debate_ma_list'
export const sqlApi:string ='/api/database_fga/database_fga_list'
export const gangApi:string ='/api/syllabus_ga/syllabus_ga_list'
export const knowledgeApi:string ='/api/industry_kba/industry_kba_list'
export const subjectApi:string ='/api/stratified_pq/stratified_pq_list'
export const leanApi:string ='/api/personalized_la/personalized_la_list'
export const qaApi:string ='/api/rd_a/rd_a_list'
export const healthApi:string ='/api/health_manager/portrait_list'
export const treatmentApi:string ='/api/treatment_manager/treatment_manager_list'
export const carApi:string ='/api/car_manager/car_manager_list'
export const virtuallearningApi:string ='/api/virtuallearning_manager/virtuallearning_manager_list'
export const backupApi:string ='/api/backup/backup'
// 伙伴

export const virtuallearningDailyApi:string ='/api/statistics_manager/statistics/daily'
export const specialitiesApi:string ='/api/specialityss/specialities'
export const carDailyApi:string ='/api/statistics_manager/statistics/car'
export const treatmentDailyApi:string ='/api/statistics_manager/statistics/treatment'
export const mentalhealthDailyApi:string ='/api/statistics_manager/statistics/mentalhealth'
export const researchDailyApi:string ='/api/statistics_manager/statistics/research'
export const personalizeDailyApi:string ='/api/statistics_manager/statistics/personalize'
export const stratifieDailyApi:string ='/api/statistics_manager/statistics/stratifie'
export const industryDailyApi:string ='/api/statistics_manager/statistics/industry'
export const syllaDailyApi:string ='/api/statistics_manager/statistics/sylla'
export const databaseDailyApi:string ='/api/statistics_manager/statistics/database'
export const debateDailyApi:string ='/api/statistics_manager/statistics/debate'
export const onlineDailyApi:string ='/api/statistics_manager/statistics/online'
export const lessonDailyApi:string ='/api/statistics_manager/statistics/lesson'
export const intelligentDailyApi:string ='/api/statistics_manager/statistics/intelligent'
export const interactiveDailyApi:string ='/api/statistics_manager/statistics/interactive'
export const codeDailyApi:string ='/api/statistics_manager/statistics/code'
export const languageDailyApi:string ='/api/statistics_manager/statistics/language'
export const dialogueDailyApi:string ='/api/statistics_manager/statistics/dialogue'
export const gudicanDailyApi:string ='/api/statistics_manager/statistics/intelligent'













































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
