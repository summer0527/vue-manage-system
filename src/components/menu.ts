import { Menus } from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: '用户行为统计',
        index: '/dashboard',
        icon: 'Odometer',
    },
    {
        id: '1',
        title: '基础管理',
        index: '1',
        icon: 'HomeFilled',
        children: [
            {
                id: '11',
                pid: '1',
                index: '/system-user',
                title: '用户管理',
            },
            // {
            //     id: '12',
            //     pid: '1',
            //     index: '/system-role',
            //     title: '用户画像管理',
            // }
            
        ],
    },
    {
        id: '2',
        title: '学科管理',
        index: '2-1',
        icon: 'Calendar',
        children: [
            {
                id: '21',
                pid: '3',
                index: '/system-compus',
                title: '学校管理',
            },
            {
                id: '22',
                pid: '3',
                index: '/system-collage',
                title: '学院管理',
            },
            {
                id: '23',
                pid: '2',
                index: '/system-major',
                title: '专业管理',
            },
            {
                id: '24',
                pid: '2',
                index: '/system-course',
                title: '课程管理',
            },
           
           
        ],
    },
    {
        id: '3',
        title: '对话管理',
        index: '3',
        icon: 'Calendar',
        children: [
            {
                id: '31',
                pid: '3',
                index: '/system-dialogue',
                title: '对话记忆助手',
            },
            {
                id: '32',
                pid: '3',
                index: '/system-translate',
                title: '翻译助手',
            },
            {
                id: '33',
                pid: '3',
                index: '/system-code',
                title: '代码生成助手',
            },
            {
                id: '34',
                pid: '3',
                index: '/system-class',
                title: '课堂互助问答助手',
            },
            {
                id: '35',
                pid: '3',
                index: '/system-customer',
                title: '智能客服助手',
            },
            {
                id: '36',
                pid: '3',
                index: '/system-guidance',
                title: '智能导诊与患者服务',
            },
            {
                id: '37',
                pid: '3',
                index: '/system-teacher',
                title: '教案生成助手',
            },
            {
                id: '38',
                pid: '3',
                index: '/system-physical',
                title: '线上体检助手',
            },
            {
                id: '39',
                pid: '3',
                index: '/system-man',
                title: '辩论主持人助手',
            },
            {
                id: '40',
                pid: '3',
                index: '/system-sql',
                title: '数据表字段生成助手',
            },
            {
                id: '41',
                pid: '3',
                index: '/system-gang',
                title: '教学大纲生成助手',
            },
            {
                id: '42',
                pid: '3',
                index: '/system-knowledge',
                title: '行业知识库助手',
            },
            {
                id: '43',
                pid: '3',
                index: '/system-subject',
                title: '分层练习题助手',
            },
            {
                id: '44',
                pid: '3',
                index: '/system-lean',
                title: '个性化学习助手',
            },
            {
                id: '45',
                pid: '3',
                index: '/system-qa',
                title: '研发问答助手',
            },
            {
                id: '46',
                pid: '3',
                index: '/system-health',
                title: '心理健康支持助手',
            },
            {
                id: '47',
                pid: '3',
                index: '/system-car',
                title: '汽车故障检修助手',
            },
            {
                id: '48',
                pid: '3',
                index: '/system-virtuallearning',
                title: '虚拟学习伙伴助手',
            },
            {
                id: '49',
                pid: '3',
                index: '/system-treatment',
                title: '治疗虚拟教学培训助手',
            },
            
        ],
    },
    {
        id: '4',
        title: '数据备份',
        index: '/system-dataCopy',
        icon: 'DocumentAdd',
      
    },
  
   
    // {
    //     id: '6',
    //     icon: 'DocumentAdd',
    //     index: '6',
    //     title: '附加页面',
    //     children: [
    //         {
    //             id: '61',
    //             pid: '6',
    //             index: '/ucenter',
    //             title: '个人中心',
    //         },
    //         {
    //             id: '62',
    //             pid: '6',
    //             index: '/login',
    //             title: '登录',
    //         },
    //         {
    //             id: '63',
    //             pid: '6',
    //             index: '/register',
    //             title: '注册',
    //         },
           
    //         {
    //             id: '65',
    //             pid: '6',
    //             index: '/403',
    //             title: '403',
    //         },
    //         {
    //             id: '66',
    //             pid: '6',
    //             index: '/404',
    //             title: '404',
    //         },
    //     ],
    // },
];
