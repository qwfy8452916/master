import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        searchList: {},
        isNotDeal: false,
        allOrderCount: "",//所有订单计数
        toDealOrderCount: "",//待处理订单计数
        toLiveOrderCount: "",//待入住订单计数
        todayLiveOrderCount: "",//今日入住订单计数
        todayOrderCount: "",//今日订单计数
        isOrderChange: 1,//订单界面是否点击
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
        setAllOrderCount(state, params) {
            state.allOrderCount = params;
        },
        setToDealOrderCount(state, params) {
            state.toDealOrderCount = params;
        },
        setToLiveOrderCount(state, params) {
            state.toLiveOrderCount = params;
        },
        setTodayLiveOrderCount(state, params) {
            state.todayLiveOrderCount = params;
        },
        setTodayOrderCount(state, params) {
            state.todayOrderCount = params;
        },
        setIsOrderChange(state) {
            state.isOrderChange += 1;
        },
    },
    getters: {
        getIsNotDeal(state) {
            return state.isNotDeal;
        },
        getAllOrderCount(state) {
            return state.allOrderCount;
        },
        getToDealOrderCount(state) {
            return state.toDealOrderCount;
        },
        getToLiveOrderCount(state) {
            return state.toLiveOrderCount;
        },
        getTodayLiveOrderCount(state) {
            return state.todayLiveOrderCount;
        },
        getTodayOrderCount(state) {
            return state.todayOrderCount;
        },
        getIsOrderChange(state) {
            return state.isOrderChange;
        },
    },
    actions: {

    }
})

export default store