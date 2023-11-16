const personalChildren = [
    {
        path: '/my_home/TD',
        name: 'TD',
        component: () =>
            import('../views/personal/TD.vue'),
        meta: {
            needLogin: true
        },
    },
    {
        path: '/my_home/Score',
        name: 'Score',
        component: () =>
            import('../views/personal/Score.vue'),
        meta: {
            needLogin: true
        },
    },
]

export default personalChildren