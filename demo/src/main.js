import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from "axios"


const baseURL = "http://localhost:4001"
const app = createApp(App);
installElementPlus(app);
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true; //前端跨域传递Cookie设置
app.config.globalProperties.$axios = axios;//$axios全局


app.use(store).use(router).mixin({
	data() {
		return {
			baseURL
		}
	}
}).mount('#app');
