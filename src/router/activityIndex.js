const activityChildren = [
    {
        path: '/activity_home/activity_area',
        name: 'ActivityArea',
        component: () =>
            import('../views/activity/ActivityArea.vue'),
        meta: {
            needLogin: true
        },
    },
    {
        path: '/activity_home/activity/:id',
        name: 'Activity',
        component: () =>
            import('../views/activity/ActivityInfo'),
        meta: {
            needLogin: true
        }
    },
    {
        path: '/activity_home/activity_create',
        name: 'ActivityCreate',
        component: () =>
            import('../views/activity/ActivityCreate'),
        meta: {
            needLogin: true
        }
    },
    {
        path: '/activity_home/my_activity',
        name: 'MyActivity',
        component: () =>
            import('../views/activity/MyActivity.vue'),
        meta: {
            needLogin: true
        }
    }
]

export default activityChildren