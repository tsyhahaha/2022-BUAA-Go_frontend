import * as types from './mutation-types'

const mutations = {
    [types.SET_USER_NAME](state, name) {
        state.user.name = name;
    },
    [types.SET_USER_EMAIL](state, email) {
        state.user.email = email;
    },
    [types.SET_USER_ID](state, id) {
        state.user.identity = id;
    },
    [types.SET_USER_NUMBER](state, number) {
        state.user.number = number;
    },
    [types.SET_USER_GRADE](state, grade) {
        state.user.grade = grade;
    },
    [types.SET_TOKEN](state, token) {
        state.token = token;
    },
    [types.SET_REGISTERED](state, bool) {
        state.registered = bool;
    },
    [types.SET_COURSEID](state, bool) {
        state.courseId = bool;
    },
    [types.SET_USERTYPE](state, type) {
        state.user_type = type;
    }
}

export default mutations;
