import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '@/utils/http'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rowList:{},
    value1:[],
    value2:[],
    fromDetail:"",
    role:""
  },
  getters: {
  },
  mutations: {
    //将orderlist中拿到的数据存进来
    getRow(state,playload){
      state.rowList=playload
    },
    clearRow(state){
      state.rowList={}
    },
    getValue1(state,playload){
      state.value1=playload   
    },
    getValue2(state,playload){
      state.value2=playload   
    },
    getDetail(state,playload){
      state.fromDetail=playload
    },
    setRole(state,playload){
      state.role=playload
    }
  },
  actions: {
   async getRole({commit}){
     let  {role}= await get("/getRole")
     commit('setRole',role)
    }
  },
  modules: {
  }
})
