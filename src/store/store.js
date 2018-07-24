import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemSelected: {},
        headerCarouselItems: []
    },
    mutations: {
        setSelectedTool: (state, tool) => {
            state.itemSelected = tool;
        },
        setCarouselItems: (state, items) => {
            state.headerCarouselItems = items;
        }
    },
    actions: {}
});
