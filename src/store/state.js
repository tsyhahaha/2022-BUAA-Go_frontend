const state = {
    "user": JSON.parse(sessionStorage.getItem("user")) || {
        name: '',
        email: '',
        identity: '',
        number: '',
        grade: ''
    },
    "token": sessionStorage.getItem("token") || {
        token: ''
    },
    "registered": sessionStorage.getItem("registered") || {
        registered: ''
    },
    "courseId": sessionStorage.getItem("courseId") || {
        courseId: ''
    },
    "user_type": sessionStorage.getItem("user_type") || {
        type: ''
    }
}

export default state;