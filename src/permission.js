import router from '@/router'

const whiteRoute = ['/login', '/', '/register', '/password']

router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem("token")
    next();
    if (whiteRoute.includes(to.path)) {
        if(to.path === '/password') {
            const hasRegistered = sessionStorage.getItem("registered")
            if (hasRegistered) {
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        if(to.meta.needLogin) {
            if (token) {
                next();
            } else {
                next('/');
            }
        } else {
            next();
        }
    }
})