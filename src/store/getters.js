const getters = {
    getToken(state) {
        return state.token
    },
    getUser(state) {
        return state.user
    },
    getRegistered(state) {
        return state.registered
    },
    getType(state) {
        return state.user_type
    }
}

export default getters;

