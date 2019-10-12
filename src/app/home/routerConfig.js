export default [
    {
        path: '/welcome',
        exact: true,
        page: () => { return import('../welcome/index'); },
        name: '欢迎',
    }, {
        path: '/permission',
        exact: true,
        page: () => { return import('../permission/index'); },
        name: '权限',
    }, {
        path: '/member/member/list',
        exact: true,
        page: () => { return import('../member/member/list/index'); },
        name: '会员',
    }
];
