import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import Socket from './modules/socket'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Socket
    },
})
