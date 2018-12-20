import io from 'socket.io-client'

const state = {
    socket: io('192.168.1.129:8080')
}

// getters
const getters = {
    /**
     * Retourne l'instance de socket
     *
     * @param state
     * @param getters
     * @param rootState
     * @returns {*}
     */
    getSocket: (state, getters, rootState) => {
        return state.socket
    },
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}