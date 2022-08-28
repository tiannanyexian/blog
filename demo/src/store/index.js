import { createStore } from 'vuex'

export default createStore({
  state: {
	  userInfo:{},
	  addLink:0//用来监听添加友链
  },
  mutations: {
	  updateUserInfo(state,userInfo){//修改updateUserInfo里的值
		  state.userInfo=userInfo  //将用户数据更新到state.userInfo
	  },
	  clearUserInfo(state){//清除userinfo数据
		  state.userInfo={}
	  },
	  noticeAddLink(state){//每天加一条就加1
		  state.addLink++
	  }
  },
  actions: {
  },
  modules: {
  }
})
