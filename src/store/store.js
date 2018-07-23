import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemSelected: {}
    },
    mutations: {
        setSelectedTool: (state, tool) => {
            state.itemSelected = tool;
        }
    },
    actions: {}
});
