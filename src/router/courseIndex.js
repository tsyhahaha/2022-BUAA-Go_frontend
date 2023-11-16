const courseChildren = [
    {
        path: '/course_home/course_info',
        name: 'CourseCourseInfo',
        component: () =>
            import('../views/course/CourseInfo.vue'),
        meta: {
            needLogin: true
        },
    },
    {
        path: '/course_home/homework',
        name: 'CourseHomework',
        component: () =>
            import('../views/course/Homework.vue'),
        meta: {
            needLogin: true
        },
    },
    {
        path: '/course_home/collect',
        name: 'CourseCollect',
        component: () =>
            import('../views/course/CollectHomework.vue'),
        meta: {
            needLogin: true
        }
    },
    {
        path: '/course_home/create',
        name: 'CourseCreate',
        component: () =>
            import('../views/course/CreateCourse.vue'),
        meta: {
            needLogin: true
        }
    }
]

export default courseChildren
