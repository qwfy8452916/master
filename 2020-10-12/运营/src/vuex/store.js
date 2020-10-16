import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        searchList: {},
        isNotDeal: true,
    },
    mutations: {
        resetSearch(state) { //重置搜索条件
            state.searchList = {};
        },
        setSearchList(state, params) {//储存搜索条件
            state.searchList = params;
        },
        setIsNotDeal(state, params) {//储存是否为未处理状态
            state.isNotDeal = params;
        },
    },
    getters: {
        getIsNotDeal(state) {
            return state.isNotDeal;
        },
    },
    actions: {

    }
})

export default store