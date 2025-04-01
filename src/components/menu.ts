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
            {
                id: '12',
                pid: '1',
                index: '/system-role',
                title: '用户画像管理',
            }
            
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
                title: '校区管理',
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
                title: '对话管理',
            }
        ],
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
