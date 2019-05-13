export default [
    // {
    //     path: '/',
    //     redirect: '/about',
    //     name: 'indexPage',
    //     meta: {
    //         title: '借款通',
    //     },
    //     component: () => import(/* webpackChunkName: "indexPage" */ '@V/index/IndexPage'),
    // },
    {
        path: '/',
        name: 'test',
        meta: {
            title: '测试',
        },
        component: () => import(/* webpackChunkName: "test" */ '@V/test/test'),
    },
];
