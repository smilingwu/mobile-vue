export default [
    {
        path: '/',
        //redirect: '/',
        name: 'test',
        meta: {
            title: '测试',
        },
        component: () => import(/* webpackChunkName: "test" */ '@V/test/test'),
    },
];
