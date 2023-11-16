import Vue from 'vue'
import VueRouter from 'vue-router'
import adminChildren from "@/router/adminIndex";
import courseChildren from "@/router/courseIndex";
import activityChildren from "@/router/activityIndex";
import personalChildren from "@/router/personalIndex";

Vue.use(VueRouter)

// 解决 ElementUI 导航栏中的 vue-router 在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: () =>
            import('../views/welcome/Welcome.vue'),
        meta: {
            needLogin: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('../views/welcome/Login.vue'),
        meta: {
            needLogin: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import('../views/welcome/Register.vue'),
        meta: {
            needLogin: false
        }
    },
    {
        path: '/password',
        name: 'Password',
        component: () =>
            import('../views/welcome/Password.vue'),
        meta: {
            needLogin: false
        }
    },
    {
        path: '/course',
        name: 'Course',
        component: ()=>
            import('../views/course/CourseInfo.vue'),
        meta: {
            needLogin: true
        }
    },

    {
        path: '/main_home',
        name: 'MainHome',
        component: () =>
            import('../views/MainHome.vue'),
        meta: {
            needLogin: true
        },
        redirect: '/course_home',
        children: [
            {
                path: '/course_home',
                name: 'CourseHome',
                component: () =>
                    import('../views/course/CourseHome.vue'),
                children: courseChildren,
                redirect: '/course_home/course_info',
                meta: {
                    needLogin: true
                },
            },
            {
                path: '/activity_home',
                name: 'ActivityHome',
                component: () =>
                    import('../views/activity/ActivityHome.vue'),
                children: activityChildren,
                redirect: '/activity_home/activity_area',
                meta: {
                    needLogin: true
                },
            },
            {
                path: '/my_home',
                name: 'MyHome',
                component: () =>
                    import('../views/personal/MyHome.vue'),
                children: personalChildren,
                redirect: '/my_home/TD',
                meta: {
                    needLogin: true
                },
            },
            {
                path: '/admin_home',
                name: 'AdminHome',
                component: () =>
                    import('../views/admin/AdminHome.vue'),
                children: adminChildren,
                redirect: '/admin_home/course_list',
                meta: {
                    needLogin: true
                },
            },

        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router