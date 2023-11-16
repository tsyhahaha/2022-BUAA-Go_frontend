const adminChildren = [
    {
        path: '/admin_home/course_list',
        name: 'AdminCourseList',
        component: () =>
            import('../views/admin/CourseList.vue'),
        meta: {
            needLogin: true
        },
    },
    {
        path: '/admin_home/person_list',
        name: 'AdminPersonList',
        component: () =>
            import('../views/admin/PersonList.vue'),
        meta: {
            needLogin: true
        },
    }
]

export default adminChildren
