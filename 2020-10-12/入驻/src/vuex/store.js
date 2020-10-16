import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
        searchList:{}
	},
	mutations: {
        resetSearch(state) { //重置搜索条件
            state.searchList = {};
        },
        setSearchList(state,params){//储存搜索条件
            state.searchList = params
        }
	},
    getters: {
        
    },
	actions: {
		
	}
})

export default store